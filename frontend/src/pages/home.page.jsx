import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import TabsNavigation from "../components/home/TabsNavigation";
import axios from "axios";
import LoaderSpinner from "../components/loader.component";
import BlogPost from "../components/blog-post.component";
import NoBannerBlogPost from "../components/nobanner-blog-post.component";
import { ChartBarStacked, TrendingUpIcon } from "lucide-react";
import NoDataFoundMessage from "../components/nodata.component";
import { formatPaginationData } from "../../libs/utils/formatPaginationData";
import LoadMoreButton from "../components/load-more.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [pageState, setPageState] = useState("home");
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  const [isPopularBlogsLoading, setIsPopularBlogsLoading] = useState(false);
  const categories = [
    "all",
    "tech",
    "cooking",
    "travel",
    "health",
    "business",
    "sports",
    "entertainment",
    "finance",
  ];
  const getBlogs = async (page = 1) => {
    try {
      setIsBlogsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/latest`,
        { page }
      );

      if (response.statusText === "OK") {
        const latestBlogs = response.data.latestBlogs || [];
        const formatedData = await formatPaginationData({
          state: blogs,
          data: latestBlogs,
          page,
          countRoute: "api/blog/all-latest-blogs-count",
        });
        setBlogs(formatedData);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsBlogsLoading(false);
    }
  };
  const getPopularBlogs = async () => {
    try {
      setIsPopularBlogsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/popular`
      );

      if (response.statusText === "OK") {
        setIsPopularBlogsLoading(false);
        setPopularBlogs(response.data.popularBlogs);
      }
    } catch (error) {
      setIsPopularBlogsLoading(false);
      console.log(error.message);
    }
  };

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs([]);

    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const filterBlogByCategory = async ({ page = 1 }) => {
    try {
      if (pageState == "all" || pageState == "home") {
        getBlogs();
      } else {
        setIsBlogsLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/blog/search`,
          { category: pageState, page }
        );

        if (response.statusText === "OK") {
          const filteredBlogs = response.data.filteredBlogs;
          const formatedData = await formatPaginationData({
            data: filteredBlogs,
            state: blogs,
            page,
            countRoute: "api/blog/search-count",
            data_to_send: { category: pageState },
          });
          setIsBlogsLoading(false);

          setBlogs(formatedData);
        }
      }
    } catch (error) {
      setIsBlogsLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (popularBlogs.length === 0) {
      getPopularBlogs();
    }
    if (pageState == "home") {
      getBlogs();
    } else {
      filterBlogByCategory({ page: 1 });
    }
  }, [pageState]);
  return (
    <AnimationWrapper className="h-cover flex justify-center  max-w-[1700px] mx-auto ">
      {/* latest blogs */}
      <div className="w-full px-8 xl:px-8 overflow-y-auto h-screen " id="blogs">
        <TabsNavigation
          routes={[pageState, "popular"]}
          defaultHidden={["popular"]}
        >
          <>
            {!isBlogsLoading && blogs.results && blogs.results.length === 0 && (
              <NoDataFoundMessage
                message={`No blogs found under ${pageState} category`}
              />
            )}
            {isBlogsLoading ? (
              <LoaderSpinner />
            ) : (
              blogs.results &&
              blogs?.results.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <BlogPost
                      key={i}
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  </AnimationWrapper>
                );
              })
            )}

            <LoadMoreButton
              state={blogs}
              getData={pageState === "home" ? getBlogs : filterBlogByCategory}
            />
          </>
          <>
            {!isPopularBlogsLoading && popularBlogs.length === 0 && (
              <NoDataFoundMessage message={"No trending blogs found"} />
            )}
            {isPopularBlogsLoading ? (
              <LoaderSpinner />
            ) : (
              popularBlogs?.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <NoBannerBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            )}
          </>
        </TabsNavigation>
      </div>
      {/* filters and trending blogs */}
      <div className="min-w-[40%] lg:min-w-[400px]  border-l border-grey pl-8 pt-3 max-md:hidden  overflow-x-auto h-screen">
        <div className="flex flex-col gap-10 ">
          <div>
            <h1 className="font-medium mb-8 text-2xl flex items-center gap-3">
              Categories <ChartBarStacked />
            </h1>
            <div className="flex gap-3 flex-wrap ">
              {categories.map((category, i) => (
                <button
                  onClick={loadBlogByCategory}
                  className={`${
                    pageState == category ? "bg-black text-white tag" : "tag"
                  } `}
                  key={i}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 mt-8">
          <h1 className="flex items-center gap-3 font-medium  px-6 py-2  w-fit text-2xl">
            Popular <TrendingUpIcon />
          </h1>
          {popularBlogs.length == 0 ? (
            <LoaderSpinner />
          ) : (
            popularBlogs?.map((blog, i) => {
              return (
                <AnimationWrapper
                  transition={{ duration: 1, delay: i * 0.1 }}
                  key={i}
                >
                  <NoBannerBlogPost className={"p-2"} blog={blog} index={i} />
                </AnimationWrapper>
              );
            })
          )}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import NoDataFoundMessage from "../components/nodata.component";
import LoaderSpinner from "../components/loader.component";
import BlogPost from "../components/blog-post.component";
import TabsNavigation from "../components/home/TabsNavigation";
import { formatPaginationData } from "../../libs/utils/formatPaginationData";
import LoadMoreButton from "../components/load-more.component";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  const [isBackendError, setIsBackendError] = useState(false);
  const { query } = useParams();

  const getSearchResult = async ({ page = 1, create_new_array = false }) => {
    try {
      setIsBlogsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/search`,
        { query, page }
      );
      if (res.statusText === "OK") {
        const searchBlogs = res.data.searchedBlogs;
        const formateData = await formatPaginationData({
          state: searchResult,
          data: searchBlogs,
          page,
          countRoute: "api/blog/search-count",
          data_to_send: { query },
          createNewArray: create_new_array,
        });
        console.log(formateData.results);
        setIsBlogsLoading(false);
        setSearchResult(formateData);
      }
    } catch (error) {
      console.log(error);
      setIsBackendError(true);
    }
  };

  useEffect(() => {
    setSearchResult([]);
    getSearchResult({ page: 1, create_new_array: true });
  }, [query]);
  if (isBackendError) {
    return (
      <NoDataFoundMessage
        className="bg-red text-white max-w-md mx-auto"
        message={"Something went wrong"}
      />
    );
  }
  if (isBlogsLoading) {
    return <LoaderSpinner />;
  }
  if (!isBlogsLoading && searchResult.length === 0) {
    return (
      <NoDataFoundMessage
        className="max-w-xl mx-auto"
        message={"No blogs found try different search keyword"}
      />
    );
  }
  return (
    <section className="h-cover flex justify-center gap-10 max-w-[1700px] mx-auto">
      <div className="w-full">
        <TabsNavigation
          defaultHidden={["Accounts matched"]}
          routes={[`Search results`, "Accounts matched"]}
        >
          <>
            <h1 className="px-4 text-2xl md:text-4xl text-center mb-4">
              Search results for "{query}"
            </h1>
            {searchResult.results &&
              searchResult.results.map((blog, i) => (
                <BlogPost
                  content={blog}
                  author={blog.author.personal_info}
                  key={i}
                />
              ))}
            <LoadMoreButton state={searchResult} getData={getSearchResult} />
          </>
          <>{/* account matched */}</>
        </TabsNavigation>
      </div>
    </section>
  );
};
export default SearchPage;

{
  /*
  
  searchResult.map((blog, i) => (
    <BlogPost key={i} content={blog} author={blog.author.personal_info} />
  ));
  */
}

import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import TabsNavigation from "../components/home/TabsNavigation";
import axios from "axios";
import LoaderSpinner from "../components/loader.component";
import BlogPost from "../components/blog-post.component";
import NoBannerBlogPost from "../components/nobanner-blog-post.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/latest`
      );
      setBlogs(data.allBlogs);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getPopularBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/popular`
      );
      setPopularBlogs(data.popularBlogs);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getBlogs();
    getPopularBlogs();
  }, []);
  return (
    <AnimationWrapper className="h-cover flex justify-center gap-10 max-w-7xl mx-auto ">
      {/* latest blogs */}
      <div className="w-full px-8 lg:px-0 ">
        <TabsNavigation
          routes={["home", "popular"]}
          defaultHidden={["popular"]}
        >
          <>
            {blogs.length == 0 ? (
              <LoaderSpinner />
            ) : (
              blogs.map((blog, i) => {
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
          </>
          {popularBlogs.length == 0 ? (
            <LoaderSpinner />
          ) : (
            popularBlogs.map((blog, i) => {
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
        </TabsNavigation>
      </div>
      {/* filters and trending blogs */}
    </AnimationWrapper>
  );
};

export default HomePage;

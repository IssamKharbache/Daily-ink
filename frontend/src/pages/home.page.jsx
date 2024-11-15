import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import TabsNavigation from "../components/home/TabsNavigation";
import axios from "axios";
import LoaderSpinner from "../components/loader.component";
import BlogPost from "../components/blog-post.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
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
    getBlogs();
  }, []);
  return (
    <AnimationWrapper className="h-cover flex justify-center gap-10 max-w-7xl mx-auto">
      {/* latest blogs */}
      <div className="w-full">
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

          <div className="">Popular blog here</div>
        </TabsNavigation>
      </div>
      {/* filters and trending blogs */}
    </AnimationWrapper>
  );
};

export default HomePage;

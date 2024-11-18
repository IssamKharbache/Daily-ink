import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoDataFoundMessage from "../components/nodata.component";
import LoaderSpinner from "../components/loader.component";
import BlogPost from "../components/blog-post.component";
import TabsNavigation from "../components/home/TabsNavigation";
import { formatPaginationData } from "../../libs/utils/formatPaginationData";
import LoadMoreButton from "../components/load-more.component";
import AnimationWrapper from "../common/page-animation";
import UserCard from "../components/usercard.component";
import { User2Icon } from "lucide-react";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  const [isBackendError, setIsBackendError] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { query } = useParams();

  //component
  const UserCardWrapper = () => {
    if (isBackendError) {
      return (
        <NoDataFoundMessage
          message={"Something went wrong"}
          className={"bg-red text-white max-w-md mx-auto rounded-full"}
        />
      );
    }
    if (isUserLoading) {
      return <LoaderSpinner />;
    }
    if (!isUserLoading && users.length === 0) {
      return (
        <NoDataFoundMessage message={"No users found"} className="mx-auto" />
      );
    }

    return users.map((user, i) => (
      <AnimationWrapper key={i} transition={{ duration: 0.2, delay: i * 0.08 }}>
        <UserCard user={user} />
      </AnimationWrapper>
    ));
  };

  const getUsers = async () => {
    try {
      setIsUserLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/search-users`,
        { query }
      );

      if (res.statusText === "OK") {
        setIsUserLoading(false);
        setUsers(res.data.searchedUsers);
      }
    } catch (error) {
      console.log(error);
      setIsBackendError(true);
    }
  };

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
        setIsBlogsLoading(false);
        setSearchResult(formateData);
      }
    } catch (error) {
      console.log(error);
      setIsBackendError(true);
    }
  };

  const resetResults = () => {
    setSearchResult([]);
    setUsers([]);
  };
  useEffect(() => {
    resetResults();
    getSearchResult({ page: 1, create_new_array: true });
    getUsers();
  }, [query]);

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
            {isBlogsLoading && <LoaderSpinner />}

            {!isBlogsLoading && searchResult?.results?.length === 0 && (
              <NoDataFoundMessage
                message="No blogs found for this query , try different query"
                className="w-full"
              />
            )}

            {isBackendError && (
              <NoDataFoundMessage
                className="bg-red text-white max-w-md mx-auto rounded-full"
                message={"Something went wrong "}
              />
            )}
            {searchResult &&
              searchResult.results &&
              searchResult.results.map((blog, i) => {
                return (
                  <BlogPost
                    content={blog}
                    author={blog.author.personal_info}
                    key={i}
                  />
                );
              })}
            <LoadMoreButton state={searchResult} getData={getSearchResult} />
          </>
          <>
            {/* account matched */}
            <UserCardWrapper />
          </>
        </TabsNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pt-3 max-md:hidden pl-8">
        <h1 className="flex items-center gap-3 font-medium mb-8 text-2xl ">
          Users related to search
          <User2Icon />
        </h1>
        {/* account matched */}
        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;

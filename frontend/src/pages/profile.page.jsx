import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import LoaderSpinner from "../components/loader.component";
import TabsNavigation from "../components/home/TabsNavigation";
import { checkNumberOfBlogsandReads } from "../../libs/utils/utils";
import { UserContext } from "../context/UserContext";
import AboutUser from "../components/about.component";
import { formatPaginationData } from "../../libs/utils/formatPaginationData";
import NoDataFoundMessage from "../components/nodata.component";
import BlogPost from "../components/blog-post.component";
import LoadMoreButton from "../components/load-more.component";

export const profileData = {
  personal_info: {
    fullname: "",
    username: "",
    email: "",
    bio: "",
    profile_img: "",
  },
  account_info: {
    total_reads: 0,
    total_posts: 0,
  },
  social_links: {},
  joinedAt: "",
};

const UserProfilePage = () => {
  //get user logged in data
  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);
  //user states
  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileData);
  const [userBlogs, setUserBlogs] = useState([]);
  const {
    personal_info: {
      fullname,
      username: profile_username,
      email,
      bio,
      profile_img,
    },
    account_info: { total_reads, total_posts: total_blogs },
    social_links,
    joinedAt,
  } = profile;
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  //get user profile data function
  const getUserProfile = async () => {
    try {
      setIsProfileLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/get-profile`,
        { username: profileId }
      );
      if (response.statusText === "OK") {
        setIsProfileLoading(false);
        const user = response.data;
        getUserBlogs({ page: 1, user_id: user._id });
        setProfile(response.data);
      }
    } catch (error) {
      setIsProfileLoading(false);
      console.log(error.message);
    }
  };
  //function to get user related blogs
  const getUserBlogs = async ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? userBlogs.user_id : user_id;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/filter`,
        {
          page,
          author: user_id,
        }
      );

      if (res.statusText === "OK") {
        setIsBlogsLoading(false);
        let formatedData = await formatPaginationData({
          state: userBlogs,
          data: res.data.filteredBlogs,
          page,
          countRoute: "api/blog/filter-count",
          data_to_send: { author: user_id },
        });

        formatedData.user_id = user_id;
        setUserBlogs(formatedData);
      }
    } catch (error) {
      setIsBlogsLoading(false);
      console.log(error.message);
    }
  };

  //use effect hook to render user profile data
  useEffect(() => {
    getUserProfile();
  }, [profileId]);

  return !access_token ? (
    <Navigate to="/sign-in" />
  ) : (
    <AnimationWrapper>
      <section className="h-cover md:flex flex-row-reverse justify-start items-start gap-5 min-[1100px]:gap-12">
        {isProfileLoading && <LoaderSpinner />}
        {!isProfileLoading && profile?.personal_info && (
          <div className="md:border-l border-grey  rounded-lg flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:sticky md:top-[100px] md:py-10">
            <img
              src={profile_img}
              alt="avatar"
              className="w-48  h-48  rounded-full bg-grey  md:w-32 md:h-32"
            />
            <h1 className="text-2xl font-medium">@{profile_username}</h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            <p className="text-ms font-medium font-inter">
              {checkNumberOfBlogsandReads("blogs", total_blogs)} -{" "}
              {checkNumberOfBlogsandReads("reads", total_reads)}
            </p>
            <div className="flex gap-4 mt-2">
              {username === profile_username && (
                <Link
                  to="/settings/edit-profile"
                  className="btn-light py-2 text-center rounded-md"
                >
                  Edit Profile
                </Link>
              )}
            </div>
            <AboutUser
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
              className="max-md:hidden"
            />
          </div>
        )}

        <div className="max-md:mt-12 w-full">
          <TabsNavigation routes={["Blogs", "About"]} defaultHidden={["About"]}>
            <>
              {isBlogsLoading && <LoaderSpinner />}
              {userBlogs.results && userBlogs?.results.length === 0 && (
                <NoDataFoundMessage message="No Blogs Found" />
              )}
              {!isBlogsLoading &&
                userBlogs.results &&
                userBlogs.results.length > 0 &&
                userBlogs.results.map((blog, i) => (
                  <BlogPost
                    content={blog}
                    key={i}
                    author={blog.author.personal_info}
                  />
                ))}
              <LoadMoreButton state={userBlogs} getData={getUserBlogs} />
            </>
            <AboutUser
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
              className="sticky top-0 right-0"
            />
          </TabsNavigation>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default UserProfilePage;

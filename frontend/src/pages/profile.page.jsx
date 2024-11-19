import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import LoaderSpinner from "../components/loader.component";
import TabsNavigation from "../components/home/TabsNavigation";
import { checkNumberOfBlogsandReads } from "../../libs/utils/utils";
import { UserContext } from "../context/UserContext";
import AboutUser from "../components/about.component";

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

  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileData);
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
  const getUserProfile = async () => {
    try {
      setIsProfileLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/get-profile`,
        { username: profileId }
      );
      if (response.statusText === "OK") {
        setIsProfileLoading(false);
        console.log(response.data);
        setProfile(response.data);
      }
    } catch (error) {
      setIsProfileLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [profileId]);

  return !access_token ? (
    <Navigate to="/sign-in" />
  ) : (
    <AnimationWrapper>
      {isProfileLoading && <LoaderSpinner />}
      {!isProfileLoading && profile?.personal_info && (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">
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
          {/* <TabsNavigation></TabsNavigation> */}
        </section>
      )}
    </AnimationWrapper>
  );
};

export default UserProfilePage;

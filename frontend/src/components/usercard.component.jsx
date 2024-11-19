import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const {
    personal_info: { fullname, username, profile_img },
  } = user;
  return (
    <Link
      to={`/user/${username}`}
      className="flex gap-5 items-center mb-5 bg-grey/50  p-4 px-7 rounded-full mt-8"
    >
      <img
        src={profile_img}
        alt="user avatar"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h1 className="font-semibold text-xl line-clamp-2 capitalize">
          {fullname}
        </h1>
        <p className="text-md text-dark-grey">@{username}</p>
      </div>
    </Link>
  );
};

export default UserCard;

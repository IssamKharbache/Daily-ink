import React from "react";
import { Link } from "react-router-dom";
import { formatToDate } from "../../libs/utils/utils";

const AboutUser = ({ bio, social_links, joinedAt, className = "" }) => {
  return (
    <div className={`md:w-[90%] md:mt-7 ${className}`}>
      <p className="text-xl leading-7 text-dark-grey">
        {bio.length ? bio : "No bio available"}
      </p>
      <div className="flex gap-x-7 gap-y-2 mt-4 flex-wrap my-7 items-center text-dark-grey">
        {Object.keys(social_links).map((key) => {
          const link = social_links[key];

          return link ? (
            <Link
              className="flex gap-2 items-center hover:text-black duration-200"
              to={link}
              key={key}
              target="_blank"
            >
              <i
                className={`fi ${
                  key !== "website" ? `fi-brands-${key}` : "fi-rr-globe"
                }  `}
              ></i>
            </Link>
          ) : (
            ""
          );
        })}
      </div>
      <p className="font-inter">
        Joined at{" "}
        <span className="font-semibold font-inter">
          {formatToDate(joinedAt)}
        </span>
      </p>
    </div>
  );
};

export default AboutUser;

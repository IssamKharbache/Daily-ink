import { FrownIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/dailylogo.png";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col justify-center items-center h-[calc(96vh-80px)] relative p-10 gap-8  max-w-[1700px] mx-auto text-dark-grey text-center ">
      <FrownIcon size={150} />
      <h1 className="text-center text-2xl leading-7 md:text-4xl mt-8 font-inter ">
        404 Page not found
      </h1>
      <p className="font-inter mt-4 leading-7 text-center text-md">
        The page you are looking for does not exist, please head back to{" "}
        <Link to="/" className="text-black hover:text-black/80 underline ">
          Home
        </Link>
      </p>
      <div className="mt-auto">
        <Link to="/">
          <img
            src={logo}
            className="w-36  object-contain mx-auto select-none"
            alt="dailyink logo"
          />
        </Link>
        <p className="mt-4 font-inter text-dark-grey">
          © 2023 Dailyink. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;

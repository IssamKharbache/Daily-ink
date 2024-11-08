import InputBox from "../components/input.component";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-faculty capitalize text-center mb-24 font-bold">
          {type === "sign-in" ? "Welcome back" : "Start your journey"}
        </h1>
        {type != "sign-in" ? (
          <InputBox
            name="fullname"
            type="text"
            placeHolder="Enter your full name"
          />
        ) : (
          ""
        )}
        <InputBox name="email" type="email" placeHolder="Enter your email" />
        <InputBox
          name="password"
          type="password"
          placeHolder="Enter your password"
        />
        <button type="submit" className="btn-dark w-full center mt-14 ">
          {type == "sign-in" ? "Sign in" : "Sign up"}
        </button>
        <div className="flex items-center  gap-2 my-10 opacity-20 relative w-full uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="bg-grey hover:bg-grey/40 duration-200 p-3 rounded-full flex items-center gap-4  w-full justify-center">
          <span>Continue with Google</span>
          <FcGoogle size={20} />
        </button>

        <p className="text-center text-xs  mt-4 text-dark-grey ">
          {type == "sign-in"
            ? "Don't have an account?"
            : "Already have an accout?"}{" "}
          <Link to={type == "sign-in" ? "/sign-up" : "/sign-in"}>
            {" "}
            <span className="underline  hover:text-black ">
              {type == "sign-in" ? "Sign up" : "Sign in"}
            </span>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default UserAuthForm;

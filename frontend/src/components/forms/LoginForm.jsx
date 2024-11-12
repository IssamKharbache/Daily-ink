import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { loginSchema } from "../../../libs/validation";
import { useForm } from "react-hook-form";
import { authenticatingUser } from "../../../libs/authenticatingUser";
import AnimationWrapper from "../../common/page-animation";
import LoadingButton from "../loading-button.component";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, redirect } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../../context/UserContext";
import { signInWithGoogle } from "../../common/firebase";

const LoginForm = () => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  //states to handle the form
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //react hook form
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { errors } = formState;

  //
  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await authenticatingUser(
        `${backendUrl}/api/auth/sign-in`,
        formData,
        setUserAuth
      );

      if (res.statusText === "OK") {
        reset();
        toast.success("Signed in successfully", { style: { padding: "20px" } });
        setLoading(false);
        setError("");
        return redirect("/");
      } else if (res.data.error && res.status === 403) {
        setLoading(false);
        setError(res.data.error);
      } else {
        throw new Error("Internale server error");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Something went wrong , try again later");
    }
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((user) => {
        let serverRoute = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/google-auth`;
        const formData = {
          access_token: user.accessToken,
        };
        authenticatingUser(serverRoute, formData, setUserAuth);
      })
      .catch((error) => {
        setError("Something went wrong  , try again later");
        return console.log(error);
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue="login">
      <section className="h-cover flex items-center justify-center ">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[500px] border-2 border-grey p-10 rounded"
        >
          <h1 className="text-3xl md:text-4xl font-faculty capitalize text-center mb-24 font-bold">
            Welcome back
          </h1>

          <input
            {...register("email")}
            type={"text"}
            placeholder="Enter your email"
            className={`input-box input  ${
              errors.email?.message && "border-red focus:border-red"
            }`}
          />
          <div className="mb-4 ">
            {errors && errors.email && (
              <p className="text-red text-sm font-inter ml-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="relative w-[100%] ">
            <input
              {...register("password")}
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
              className={`input-box input pe-10  ${
                errors.password?.message && "border-red focus:border-red"
              }`}
            />
            <i
              onClick={() => setShowPassword((prev) => !prev)}
              className={`fi fi-rr-${
                showPassword ? "eye" : "eye-crossed"
              } input-icon left-auto right-4 cursor-pointer`}
            ></i>
          </div>

          <div className="mb-4 ">
            {errors && errors.password && (
              <p className="text-red mb-4 text-sm font-inter ml-2">
                {errors.password?.message}
              </p>
            )}
          </div>
          {error && (
            <p className="bg-red mb-4 text-md font-inter ml-2 text-center p-2 text-white rounded">
              {error}
            </p>
          )}
          {loading ? (
            <LoadingButton text="Signing in..." />
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-dark w-full center mt-14 "
            >
              Sign in
            </button>
          )}

          <div className="flex items-center  gap-2 my-10 opacity-20 relative w-full uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            onClick={handleGoogleAuth}
            className="bg-grey hover:bg-grey/40 duration-200 p-3 rounded-full flex items-center gap-4  w-full justify-center"
          >
            <span>Continue with Google</span>
            <FcGoogle size={20} />
          </button>

          <p className="text-center   mt-4 text-dark-grey ">
            Don't have an account?{" "}
            <Link to={"/sign-up"}>
              <span className="underline  hover:text-black ">Sign up</span>
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default LoginForm;

import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { signUpSchema } from "../../../libs/validation";
import { authenticatingUser } from "../../../libs/authenticatingUser";
import AnimationWrapper from "../../common/page-animation";
import LoadingButton from "../loading-button.component";
import { UserContext } from "../../context/UserContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  //states to handle form
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //react hook form
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  //submit function
  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await authenticatingUser(
        `${backendUrl}/api/auth/sign-up`,
        formData,
        setUserAuth
      );

      // Check if res and res.data are available
      if (res && res.data) {
        // Check if the response status indicates success (200 range)
        if (res.status === 200) {
          reset();
          toast.success("Signed up successfully", {
            style: { padding: "20px" },
          });
          setLoading(false);
          setError("");
          navigate("/");
        } else if (res.data.error && res.data.code === "11000") {
          setLoading(false);
          setError(res.data.error);
        } else {
          throw new Error("Internal server error");
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("Something went wrong, please try again later");
    }
  };

  //
  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue="signup">
      <section className="h-cover flex items-center justify-center ">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[500px] border-2 border-grey p-10 rounded"
        >
          <h1 className="text-3xl md:text-4xl font-faculty capitalize text-center mb-24 font-bold">
            Start your journey
          </h1>
          <input
            {...register("fullname")}
            type={"text"}
            placeholder="Enter your full name"
            className={`input-box input ${
              errors.fullname?.message && "border-red focus:border-red"
            }`}
          />
          <div className="mb-4">
            {errors && errors.fullname && (
              <p className="text-red mb-4 text-sm font-inter ml-2">
                {errors.fullname?.message}
              </p>
            )}
          </div>

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
              className={`input-box input  ${
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
            <LoadingButton text={"Signing up..."} />
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="btn-dark w-full center mt-14 "
            >
              {"Sign up"}
            </button>
          )}

          <p className="text-center   mt-4 text-dark-grey ">
            Already have an accout?{" "}
            <Link to={"/sign-in"}>
              <span className="underline  hover:text-black ">Sign in</span>
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignUpForm;

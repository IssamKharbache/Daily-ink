import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authSchema } from "../../libs/validation";

const InputBox = ({
  name = "",
  type = "",
  id = "",
  value = "",
  placeHolder = "",
  onChange,
  className,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[100%] ">
      <input
        {...register(name)}
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        defaultValue={value}
        placeholder={placeHolder}
        onChange={onChange}
        className={`input-box input ${type == "password" && "pe-10"} ${
          className ? className : ""
        }`}
      />
      {type == "password" && (
        <i
          onClick={() => setShowPassword((prev) => !prev)}
          className={`fi fi-rr-${
            showPassword ? "eye" : "eye-crossed"
          } input-icon left-auto right-4 cursor-pointer`}
        ></i>
      )}
    </div>
  );
};

export default InputBox;

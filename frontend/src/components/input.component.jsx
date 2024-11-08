import { useState } from "react";

const InputBox = ({
  name = "",
  type = "",
  id = "",
  value = "",
  placeHolder = "",
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        defaultValue={value}
        placeholder={placeHolder}
        onChange={onChange}
        className={`input-box input ${type == "password" && "pe-10"}`}
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

import React from "react";
import { FrownIcon } from "lucide-react";
const NoDataFoundMessage = ({ message }) => {
  return (
    <div className="flex flex-col gap-8 items-center text-center w-full p-6 rounded md:rounded-full bg-grey text-dark-grey text-md md:text-xl font-inter mt-4">
      <FrownIcon size={40} />
      {message}
    </div>
  );
};

export default NoDataFoundMessage;

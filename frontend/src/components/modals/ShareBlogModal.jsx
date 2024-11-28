import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareBlogModal = ({ urlToShare, setIsOpenModal, openModal }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(urlToShare);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`  -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-full max-w-sm ${
        openModal ? "absolute bottom-[7%] right-[20%]" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Share blog</h1>
        <button onClick={() => setIsOpenModal(false)} className="p-2">
          <i className="fi fi-rr-cross-small bg-grey rounded-full w-8 h-8 flex items-center justify-center"></i>
        </button>
      </div>
      <div className="flex justify-between gap-2 flex-wrap mt-8">
        <div className="flex gap-2">
          <FacebookShareButton url={urlToShare}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={urlToShare}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={urlToShare}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        <button
          onClick={handleCopy}
          className="flex gap-2 items-center hover:bg-slate bg-slate/50 duration-150 rounded-full py-2 px-5"
        >
          <p className="text-sm">{isCopied ? "Copied" : "Copy"}</p>
          <i
            className={`fi fi-rr-${isCopied ? "check-double" : "copy-alt"}`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ShareBlogModal;

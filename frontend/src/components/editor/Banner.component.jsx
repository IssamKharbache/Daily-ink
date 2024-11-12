import React from "react";
import { uploadImage } from "../../../libs/uploadImage";
import defaultBanner from "../../imgs/blog banner.png";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const Banner = ({
  banner,
  setBanner,
  isBannerLoading,
  previewBannerFile,
  setPreviewBannerFile,
  setisBannerLoading,
}) => {
  // Handle image preview
  const previewBanner = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewBannerFile(reader.result);
    };
  };

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file) {
      setisBannerLoading(true);
      previewBanner(file);
    }
    const url = await uploadImage(file);
    //if there is no url
    if (!url) {
      setisBannerLoading("");
      toast.error("Error uploading banner", {
        style: { padding: "20px" },
      });
      return;
    }
    //if there is an url
    toast.success("Banner uploaded successfully", {
      style: { padding: "20px" },
    });
    setisBannerLoading(false);
    setBanner(url);
  };
  return (
    <div
      className={`relative aspect-video bg-white border-4 border-grey rounded ${
        !isBannerLoading ? "hover:opacity-80" : ""
      }`}
    >
      {isBannerLoading ? (
        <label className="">
          <label htmlFor="uploadPannel">
            <img
              type="file"
              src={previewBannerFile}
              className="object-cover opacity-30 z-20"
            />
          </label>
          <LoaderCircle className="animate-spin absolute top-1/2 left-1/2 " />
        </label>
      ) : (
        <label htmlFor="uploadPannel">
          <img
            src={banner || defaultBanner}
            className="z-20 cursor-pointer object-cover"
          />
          <input
            type="file"
            id="uploadPannel"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default Banner;

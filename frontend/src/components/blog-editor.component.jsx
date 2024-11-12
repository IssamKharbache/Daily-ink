import React, { useState } from "react";
import EditorNavbar from "./editor-navbar.component";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { uploadImage } from "../../libs/uploadImage";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
const BlogEditor = ({ type }) => {
  const [file, setFile] = useState(null);
  const [banner, setBanner] = useState("");
  const [isBannerLoading, setisBannerLoading] = useState(false);
  const [previewBannerFile, setPreviewBannerFile] = useState(null);

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
      setFile(file);
      previewBanner(file);
    }

    const url = await uploadImage(file);
    if (!url) {
      setisBannerLoading("");
      toast.error("Error uploading banner", {
        style: { padding: "20px" },
      });
      return;
    }
    toast.success("Banner uploaded successfully", {
      style: { padding: "20px" },
    });
    setisBannerLoading(false);
    setBanner(url);
  };

  return (
    <>
      <EditorNavbar />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey rounded hover:opacity-80">
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
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;

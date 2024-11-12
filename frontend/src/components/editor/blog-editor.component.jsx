import React, { useContext, useRef, useState } from "react";
import EditorNavbar from "../editor-navbar.component";
import AnimationWrapper from "../../common/page-animation";

import Banner from "./Banner.component";
import { EditorContext } from "../../context/EditorContext";
const BlogEditor = ({ type }) => {
  //blog stuff
  const {
    blog,
    blog: { title, banner: bannerContext, content, tags, description },
    setBlog,
  } = useContext(EditorContext);

  //state to handle banner
  const [banner, setBanner] = useState(null);
  const [isBannerLoading, setisBannerLoading] = useState(false);
  const [previewBannerFile, setPreviewBannerFile] = useState(null);
  //context to handle title
  const { setEditorTitle } = useContext(EditorContext);
  //text area stuff
  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: e.target.value });
  };

  return (
    <>
      <EditorNavbar />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            {/* banner */}
            <Banner
              blog={blog}
              setBlog={setBlog}
              isBannerLoading={isBannerLoading}
              previewBannerFile={previewBannerFile}
              setPreviewBannerFile={setPreviewBannerFile}
              setisBannerLoading={setisBannerLoading}
              banner={banner}
              setBanner={setBanner}
            />
            {/* editor */}
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none capitalize mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full my-5 opacity-10" />
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;

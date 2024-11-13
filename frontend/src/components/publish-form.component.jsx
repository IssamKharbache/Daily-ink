import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { X } from "lucide-react";
import { EditorContext } from "../context/EditorContext";
import Tag from "./tags.component";
import { toast } from "sonner";

const PublishForm = () => {
  let characLimit = 200;
  let tagLimit = 5;
  const {
    setEditor,
    blog,
    blog: { banner, title, description, tags },
    setBlog,
  } = useContext(EditorContext);
  const handleCancel = () => {
    setEditor("editor");
  };
  //text area stuff
  const handleDescriptionKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTagsKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
        e.target.value = "";
      } else {
        const tagsInput = document.getElementById("tags");
        const tagsError = document.getElementById("tagsError");
        tagsError.innerHTML = `You can only add ${tagLimit} topics per blog`;
        tagsError.style.display = "block";
        tagsInput.style.border = "2px solid red";
        e.target.value = "";
      }
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]  rounded-full bg-white text-dark-grey hover:bg-dark-grey hover:text-white flex items-center justify-center"
          onClick={handleCancel}
        >
          <X />
        </button>
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1 text-2xl">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="blog-banner" />
          </div>
          <h1 className="text-4xl font-medium mt-4 capitalize leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4 overflow-hidden">
            {description}
          </p>
        </div>
        {/* form */}
        <div className="border-dark-grey/10 lg:border-[2px] lg:p-8 rounded">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            maxLength={150}
            type="text"
            className="input-box input pl-4 placeholder:text-black/40"
            placeholder="Blog title..."
            defaultValue={title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
          <p className="text-dark-grey mb-2 mt-9">Blog description</p>
          <textarea
            className="input-box input h-40 resize-none leading-7 pl-4 placeholder:text-black/40"
            maxLength={characLimit}
            defaultValue={description}
            placeholder="Write a short description..."
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            onKeyDown={handleDescriptionKeyDown}
          ></textarea>
          {/* character counter */}
          {description.length > 0 && (
            <p className="text-sm text-dark-grey mt-2 text-right">
              {characLimit - description.length} characters left
            </p>
          )}
          {/* topics tags */}
          <p className="text-dark-grey mb-2 mt-9">Topics (max 5 tags)</p>
          <div className="relative input-box input pl-2 py-2 pb-4">
            <input
              onKeyDown={handleTagsKeyDown}
              type="text"
              className="placeholder:text-black/40 sticky input-box bg-white top-0 left-0 pl-4 mb-3 input focus:bg-white"
              placeholder="Topics..."
              id="tags"
            />
            <p id="tagsError" className="text-red text-sm hidden"></p>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} tagIndex={index} />;
            })}
          </div>
          <p className="text-sm text-dark-grey mt-2 text-right mb-4 font-inter">
            {tagLimit - tags.length}{" "}
            {tagLimit - tags.length === 1 ? "tag" : "tags"} left
          </p>
          <button className="btn-dark  px-8 w-full">Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;

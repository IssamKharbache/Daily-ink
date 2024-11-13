import { X } from "lucide-react";
import { EditorContext } from "../context/EditorContext";
import { useContext } from "react";

const Tag = ({ tag, tagIndex }) => {
  let {
    blog: { tags },
    setBlog,
    blog,
  } = useContext(EditorContext);
  const handleTagDelete = () => {
    const tagsInput = document.getElementById("tags");
    const tagsError = document.getElementById("tagsError");
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags });
    if (tags.length < 5) {
      tagsInput.style.border = "";
      tagsError.style.display = "none";
    }
  };
  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });
      e.target.setAttribute("contentEditable", false);
    }
  };
  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-60 group ">
      <div className="flex items-center justify-between  gap-5">
        <p
          onKeyDown={handleTagEdit}
          className="capitalize outline-none text-xl"
          onClick={addEditable}
        >
          {tag}
        </p>
        <button
          onClick={handleTagDelete}
          className="flex items-center w-8 h-8 justify-center bg-red/80 hover:bg-red rounded-full text-white  text-sm"
        >
          <X size={18} className="text-sm pointer-events-none  " />
        </button>
      </div>
    </div>
  );
};

export default Tag;

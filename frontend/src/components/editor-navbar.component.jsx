import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../imgs/dailylogo.png";
import { EditorContext } from "../context/EditorContext";
import { toast } from "sonner";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import LoadingButton from "./loading-button.component";

const EditorNavbar = () => {
  const {
    blog: { title, banner, content, tags, description },
    blog,
    setBlog,
    setEditor,
    textEditor,
  } = useContext(EditorContext);

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [isSavingToDraft, setSavingToDraft] = useState(false);
  const { blogId } = useParams();

  //publish funtionc
  const handlePublish = () => {
    if (!banner.length) {
      return toast.error("Please upload a blog banner first", {
        style: { padding: "20px" },
      });
    }
    if (!title.length) {
      return toast.error("Please enter a title for your blog first", {
        style: { padding: "20px" },
      });
    }
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditor("publish");
          } else {
            toast.error("Make sure you write something first", {
              style: { padding: "20px" },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // draft function
  const handleDraft = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!title.length) {
      return toast.error("Please enter a title to draft your blog ", {
        style: { padding: "20px" },
      });
    }

    if (textEditor.isReady) {
      textEditor.save().then(async (content) => {
        try {
          setSavingToDraft(true);
          const blogData = {
            title,
            content,
            banner,
            tags,
            description,
            draft: true,
          };

          const response = await axios.post(
            `${backendUrl}/api/blog/create`,
            { ...blogData, id: blogId },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          if (response) {
            toast.success("Blog saved to draft successfully", {
              style: { padding: "20px" },
            });

            setSavingToDraft(false);
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        } catch (error) {
          setSavingToDraft(false);
          if (error.response.data.error === "title is required") {
            console.log(error.response.data.error);
            toast.error("You have to add a title to save blog to draft", {
              style: { padding: "20px" },
            });
          } else {
            console.log("my bad for not handling this error :)", error.message);
            toast.error("Something went wrong, please try again later", {
              style: { padding: "20px" },
            });
          }
        }
      });
    }
  };
  return (
    <nav className="navbar justify-normal">
      <Link to="/" className="flex-none w-28  object-contain">
        <img src={logo} className="w-full" alt="logo" />
      </Link>
      <p className="max-md:hidden text-black line-clamp-1  w-full capitalize">
        {title}
      </p>
      {/* buttons */}
      <div className="flex gap-4 ml-auto items-center ">
        <button
          className="btn-dark py-3"
          onClick={handlePublish}
          disabled={isSavingToDraft}
        >
          Publish
        </button>
        {isSavingToDraft ? (
          <LoadingButton
            spinnerColor="text-dark-grey"
            text="Saving to draft..."
            className="btn-light flex py-3 items-center gap-2 pointer-events-none opacity-50"
          />
        ) : (
          <button className="btn-dark-border py-2" onClick={handleDraft}>
            Save draft
          </button>
        )}
      </div>
    </nav>
  );
};

export default EditorNavbar;

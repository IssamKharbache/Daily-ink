import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import PublishForm from "../components/publish-form.component";
import BlogEditor from "../components/editor/blog-editor.component";
import { EditorContext } from "../context/EditorContext";
import LoaderSpinner from "../components/loader.component";
import axios from "axios";

const EditorPage = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const { blogId } = useParams();

  const { editor, setBlog } = useContext(EditorContext);
  const [loading, setLoading] = useState(false);

  const getBlogData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/get-blog`,
        {
          blogId,
          draft: true,
          mode: "edit",
        }
      );
      if (res.statusText === "OK") {
        setLoading(false);
        setBlog(res.data.singleBlog);
      }
    } catch (error) {
      setBlog(null);
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!blogId) {
      return setLoading(false);
    }
    getBlogData();
  }, []);

  if (access_token === null) {
    return <Navigate to="/sign-in" />;
  }
  return loading ? (
    <LoaderSpinner />
  ) : editor == "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};
export default EditorPage;

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import PublishForm from "../components/publish-form.component";
import BlogEditor from "../components/editor/blog-editor.component";
import { EditorContext } from "../context/EditorContext";

const EditorPage = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const { editor } = useContext(EditorContext);
  if (access_token === null) {
    return <Navigate to="/sign-in" />;
  }
  return editor == "editor" ? <BlogEditor /> : <PublishForm />;
};
export default EditorPage;

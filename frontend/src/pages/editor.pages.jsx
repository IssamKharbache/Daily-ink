import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import PublishForm from "../components/publish-form.component";
import BlogEditor from "../components/editor/blog-editor.component";
import EditorContextProvider, { EditorContext } from "../context/EditorContext";

const EditorPage = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [editorState, setEditorState] = useState("editor");
  if (access_token === null) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <EditorContextProvider>
      {editorState == "editor" ? <BlogEditor /> : <PublishForm />}
    </EditorContextProvider>
  );
};
export default EditorPage;

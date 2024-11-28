import { createContext, useState } from "react";

export const EditorContext = createContext({});

const EditorContextProvider = ({ children }) => {
  const blogStructure = {
    title: "",
    banner: "",
    content: "",
    tags: [],
    description: "",
  };
  const textEditorStructure = { isReady: false };
  const [blog, setBlog] = useState(blogStructure);
  const [editor, setEditor] = useState("editor");
  const [textEditor, setTextEditor] = useState(textEditorStructure);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editor,
        setEditor,
        textEditor,
        setTextEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;

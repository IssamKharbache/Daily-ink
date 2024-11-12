import { createContext, useState } from "react";

export const EditorContext = createContext({});

const EditorContextProvider = ({ children }) => {
  const blogStructure = {
    title: "new blog",
    banner: "",
    content: "",
    tags: [],
    description: "",
    author: {
      personal_info: {},
    },
  };
  const [blog, setBlog] = useState(blogStructure);
  const [editor, setEditor] = useState("editor");

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editor,
        setEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;

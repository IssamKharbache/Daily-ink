import { createContext, useState } from "react";

export const EditorContext = createContext({});

const EditorContextProvider = ({ children }) => {
  const [editorTitle, setEditorTitle] = useState("new blog");
  return (
    <EditorContext.Provider
      value={{
        editorTitle,
        setEditorTitle,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;

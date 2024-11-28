import { createContext, useState } from "react";
import { blogStructure } from "../pages/blog.page";

export const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {
  const [singleBlog, setSingleBlog] = useState(blogStructure);

  return (
    <BlogContext.Provider value={{ singleBlog, setSingleBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

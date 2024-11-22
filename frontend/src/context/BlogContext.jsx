import { createContext, useState } from "react";
import { blogStructure } from "../pages/blog.page";

export const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {
  const [blog, setBlog] = useState(blogStructure);
  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

import { createContext, useState } from "react";
import { blogStructure } from "../pages/blog.page";

export const BlogContext = createContext({});

const BlogContextProvider = ({ children }) => {
  const [blogContext, setBlogContext] = useState(blogStructure);

  return (
    <BlogContext.Provider value={{ blogContext, setBlogContext }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

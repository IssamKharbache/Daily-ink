import React from "react";

const BlogContentBlock = ({ block }) => {
  let { type, data } = block;
  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }
  if (type === "header") {
    if (data.level == 3) {
      return (
        <h3
          className="text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        >
          {data.text}
        </h3>
      );
    }
    return (
      <h2
        className="text-4xl font-bold"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h2>
    );
  }
  if (type === "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }
  if (type === "quote") {
    return <Blogquote quote={data.text} caption={data.caption} />;
  }
  if (type === "list") {
    return <List style={data.style} items={data.items} />;
  } else {
    return <h1>This is a blog</h1>;
  }
};

export default BlogContentBlock;

const Img = ({ url, caption }) => {
  return (
    <div>
      <img src={url} alt={caption} />
      {caption.length && <p dangerouslySetInnerHTML={{ __html: caption }}></p>}
    </div>
  );
};

const Blogquote = ({ quote, caption }) => {
  return (
    <div className="bg-black/10 p-3 pl-5  border-l-4 border-black">
      <p className="text-xl leading-10 md:text-2xl ">{quote}</p>
      {caption && (
        <p
          dangerouslySetInnerHTML={{ __html: caption }}
          className="w-full text-purple text-base"
        >
          {caption}
        </p>
      )}
    </div>
  );
};

const List = ({ style, items }) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className="my-4"
            dangerouslySetInnerHTML={{ __html: item }}
          ></li>
        );
      })}
    </ol>
  );
};

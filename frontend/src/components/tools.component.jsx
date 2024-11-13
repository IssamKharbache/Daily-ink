//getting tools from editorjs

import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../../libs/uploadImage";

const uploadImageByUrl = async (e) => {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });
  return link.then((url) => {
    return {
      success: 1,
      file: {
        url,
      },
    };
  });
};
const uploadImageByFile = async (e) => {
  const url = await uploadImage(e);
  if (url) {
    return {
      success: 1,
      file: {
        url,
      },
    };
  }
};

export const tools = {
  embed: Embed,
  header: {
    class: Header,
    config: {
      placeholder: "Type heading...",
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};

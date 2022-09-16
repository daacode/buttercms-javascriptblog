import dotenv from "dotenv";
dotenv.config();

const read_token = process.env.READ_API_TOKEN;

export const getAllBlogs = async () => {
  const res = await fetch(
    `https://api.buttercms.com/v2/posts?auth_token=${read_token}`
  );
  return (await res.json()).data;
};


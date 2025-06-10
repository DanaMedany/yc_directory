import { client } from "../client";

export const authorById = async (id: string) => {
  const getAuthorById = `*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    image,
    bio,
    email
  }`;

  return await client
    .withConfig({ useCdn: false })
    .fetch(getAuthorById, { id });
};

import { client } from "../client";

export const authorByGithubId = async (id: string) => {
  const getAuthorById = `*[_type == "author" && id == $id][0]{
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

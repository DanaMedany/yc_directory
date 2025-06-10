import { groq } from "next-sanity";
import { client } from "../client";

export async function getStartupViews(id: string) {
  const STARTUP_VIEWS_QUERY = groq`*[_type == 'startup' && _id == $id][0] {
  _id, views
  }`;

  return await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
}

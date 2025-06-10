import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // if(true) this will cache content for 60 seconds and revalidate the content after every 60 seconds
  // Set to false if statically generating pages, using ISR or tag-based revalidation
});

if (!writeClient.config().token) {
  throw new Error("Sanity write client is not configured properly.");
}

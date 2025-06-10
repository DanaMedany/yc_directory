import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // if(true) this will cache content for 60 seconds and revalidate the content after every 60 seconds
  // Set to false if statically generating pages, using ISR or tag-based revalidation
});

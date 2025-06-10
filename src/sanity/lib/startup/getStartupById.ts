import { defineQuery } from 'next-sanity';

import { client } from '../client';

export async function getStartupById(id: string) {
	const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == 'startup' && _id == $id] [0] {
  _id, title, image, category, _createdAt , slug, views,
    description, pitch, author -> {_id, name, image, bio, username}
  
}`);

	// client.fetch returns the document directly
	return await client.fetch(STARTUP_BY_ID_QUERY, { id });
}

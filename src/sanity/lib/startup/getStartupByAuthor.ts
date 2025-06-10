import { groq } from 'next-sanity';
import { client } from '../client';

export async function getStartupByAuthor(id: string) {
	const STARTUP_QUERY = groq`*[_type == 'startup' && author._ref == $id] |  order(__createdAt desc) {
  _id, 
  title, 
  image, 
  category, 
  _createdAt ,
  slug, 
  views,
  description, 
  author -> {_id, name, image, bio}
  
}`;

	return await client.fetch(STARTUP_QUERY, { id });
}

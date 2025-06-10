import { groq } from 'next-sanity';
import { sanityFetch } from '../live';

export async function getStartup(search: string | null) {
	const STARTUP_QUERY = groq`*[_type == 'startup' && defined(slug.current) && title match $search || !defined($search) || author -> name match $search || category match $search] | order(__createdAt desc) {
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

	const startup = await sanityFetch({
		query: STARTUP_QUERY,
		params: { search },
	});

	return startup.data;
}

import { defineQuery } from 'next-sanity';
import { client } from '../client';

export async function getPlaylistBySlug(slug: string) {
	const PLAYLISTBYSLUG = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

	return await client.fetch(PLAYLISTBYSLUG, { slug });
}

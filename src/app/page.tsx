import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

import { SanityLive } from "@/sanity/lib/live";

import { getStartup } from "@/sanity/lib/startup/getStartup";
import { StartupCardType } from "@/types";

type SearchParams = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query } = await searchParams;

  const posts = await getStartup(query || null);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-[30px] font-semibold">
          {query ? `search result for ${query} ` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

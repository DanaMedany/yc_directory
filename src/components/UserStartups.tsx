import React from 'react';
import StartupCard from './StartupCard';
import { StartupCardType } from '@/types';

async function UserStartups({ startups }: { startups: StartupCardType[] }) {
	return (
		<>
			{startups.length > 0 ? (
				startups.map((startup: StartupCardType) => <StartupCard key={startup._id} post={startup} />)
			) : (
				<p className="no-result">No posts yet</p>
			)}
		</>
	);
}

export default UserStartups;

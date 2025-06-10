import { after } from 'next/server';

import { formatNumber } from '@/lib/formatNumber';
import Ping from './Ping';
import { getStartupViews } from '@/sanity/lib/startup/getStartupViews';
import { writeClient } from '@/sanity/lib/write-client';

async function View({ id }: { id: string }) {
	const { views: totalViews } = await getStartupViews(id);

	// this after from next it schedule the work to be done after the total views are fetch and update the views in the background to not block the UI
	after(async () => {
		await writeClient
			.patch(id)
			.set({ views: totalViews + 1 })
			.commit();
	});

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>

			<p className="view-text">
				<span className="font-black">{formatNumber(totalViews)} </span>
			</p>
		</div>
	);
}

export default View;

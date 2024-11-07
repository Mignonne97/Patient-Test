import { getBookings } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (({ url }) => {

	const data = getBookings();
	console.log('GET ', data);
	return json(data);
}) satisfies RequestHandler;

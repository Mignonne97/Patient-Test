import { getPatients } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (({ url }) => {
	//console.log('get');
	const offset = parseInt(url.searchParams.get('offset') ?? '');
	const limit = parseInt(url.searchParams.get('limit') ?? '');

	if (isNaN(offset) || isNaN(limit)) {
		throw error(400, 'Invalid offset or limit');
	}

	const data = getPatients({ offset, limit });
	return json(data);
}) satisfies RequestHandler;

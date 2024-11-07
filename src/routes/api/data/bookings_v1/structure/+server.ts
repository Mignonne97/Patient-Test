import { json, type RequestHandler } from '@sveltejs/kit';
import type { TableStructure } from '../../types';

export const GET = (() => {

	const data: TableStructure = {
		columns: [
			{ name: 'id', type: 'string' },
			{ name: 'idNumber', type: 'string' },
			{ name: 'time', type: 'string' },
			{ name: 'status', type: 'string' },
			{ name: 'type', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'surname', type: 'string' },
			{ name: 'img', type: 'string' },
			{ name: 'gender', type: 'string' },
			{ name: 'allergies', type: 'string' },
			{ name: 'date', type: 'string' },
		],
		pkColumn: 'id'
	};
	return json(data);
}) satisfies RequestHandler;
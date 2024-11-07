import { json, type RequestHandler } from '@sveltejs/kit';
import type { TableStructure } from '../../types';

export const GET = (() => {

	const data: TableStructure = {
		columns: [
			{ name: 'id', type: 'string' },
			{ name: 'name', type: 'string' },
			{ name: 'surname', type: 'string' },
			{ name: 'email', type: 'string' },
			{ name: 'cellphone', type: 'string' },
			{ name: 'idNumber', type: 'string' },
			{ name: 'dob', type: 'string' },
		],
		pkColumn: 'id'
	};
	return json(data);
}) satisfies RequestHandler;
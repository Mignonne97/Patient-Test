/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DB } from 'sqlite3oo1';

const DB_NAME = 'file:///offline-db.sqlite';
export let db: DB;

declare global {
	function sqlite3InitModule(options: { print: object; printErr: object }): Promise<void>;
}

type InitDbReturn = {
	ok: boolean;
	error?: string;
};

export async function initDb(): Promise<InitDbReturn> {
	return new Promise((resolve) => {
		try {
			self
				.sqlite3InitModule({ print: console.log, printErr: console.error })
				.then((sqlite3: any) => {
					try {
						const oo = sqlite3?.oo1 as any;
						//const opfs = sqlite3?.opfs as any;
						const capi = sqlite3.capi as any;
						const opfsFound = capi.sqlite3_vfs_find('opfs');
						if (opfsFound) {
							db = new oo.OpfsDb(DB_NAME) as DB;
						} else {
							db = new oo.DB(DB_NAME, 'ct') as DB;
						}

						// optimize for speed (with safety): https://cj.rs/blog/sqlite-pragma-cheatsheet-for-performance-and-consistency/
						db.exec(['PRAGMA journal_mode = wal;', 'PRAGMA synchronous = normal;']);

						resolve({ ok: true });
					} catch (e: any) {
						resolve({ ok: false, error: e.message });
					}
				});
		} catch (e: any) {
			resolve({ ok: false, error: e.message });
		}
	});
}
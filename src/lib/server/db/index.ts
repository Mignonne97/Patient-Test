import Database from 'better-sqlite3';

const db = new Database('static/db/test.db', { verbose: console.log });

export type Patient = {
    id: number;
    name: string;
    surname: string;
    email: string;
    cellphone: string;
    idNumber: string;
    dob: string;
}

export type Booking = {
    id: number;
    idNumber: string;
    time: string;
    status: string;
    type: string;
    name: string;
    surname: string;
    img: string;
    allergies: string;
    gender: string;
    date: string;
}

type QueryWrapper = {
	moreRows: boolean;
};

export type QueryResult<T> = { data: T } & QueryWrapper;

export function getPatientCount(): number {
	const stmt = db.prepare(`SELECT COUNT(*) as "cnt" FROM patients`);
	const data = stmt.get() as { cnt: number };
	return data.cnt;
}

export function getBookingCount(): number {
	const stmt = db.prepare(`SELECT COUNT(*) as "cnt" FROM bookings`);
	const data = stmt.get() as { cnt: number };
    console.log('data === ', data);
	return data.cnt;
}

export function getPatients({ offset = 0, limit = 500 }): QueryResult<Patient[]> {
	const stmt = db.prepare(`
    SELECT id as "id"
        , name as "name"
        , surname as "surname"
        , email as "email"
        , cellphone as "cellphone"
        , idNumber as "idNumber"
        , dob as "dob"
    FROM patients LIMIT $limit OFFSET $offset`);
	const data = stmt.all({ limit, offset }) as Patient[];

	return {
		data,
		moreRows: getPatientCount() > offset + limit
	};
}

export function getBookings(): QueryResult<Booking[]> {
    console.log('getBookings');
	const stmt = db.prepare(`
    SELECT
    b.id AS "id",
    b.idNumber "idNumber",
    b.time AS "time",
    b.status AS "status",
    b.type AS "type",
    d.name AS "name",
    d.surname AS "surname",
    d.img AS "img",
    d.allergies AS "allergies",
    d.gender AS "gender",
    b.date AS "date"
    FROM
        bookings b
    JOIN
        debtors d
    ON
        b.idNumber = d.idNumber;`);
	const data = stmt.all() as Booking[];

    console.log('data === ', data);

	return {
		data,
        moreRows: getBookingCount() > 500
	};
}


import { json } from '@sveltejs/kit';
import pkg from 'pg';
const { Client } = pkg;

async function getPostgresClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'localtest',
        password: 'masterkey',
        port: 5432,
    });
}

export async function POST({ request }) {
    const client = await getPostgresClient();
    try {
        const { appointments } = await request.json();

     //   console.log(appointments)
        
        await client.connect();
        
        for (const appt of appointments) {
            const { id,name, surname, email, cellphone, idNumber, dob } = appt;
            
            await client.query(`
                INSERT INTO patients (id,name, surname, email, cellphone, "idNumber", dob)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (id) 
                DO UPDATE SET
                    name = EXCLUDED."name",
                    surname = EXCLUDED."surname",
                    email = EXCLUDED."email",
                    cellphone = EXCLUDED."cellphone",
                    "idNumber" = EXCLUDED."idNumber",
                    dob = EXCLUDED."dob"
                `,
                [id, name, surname, email, cellphone, idNumber, dob]
            );            
        }

        return json({ success: true });
    } catch (error) {
        console.error('Failed to sync:', error);
        return json({ success: false, error: (error as Error).message });
    } finally {
        await client.end();
    }
}

export async function GET() {
    const client = await getPostgresClient();
    try {
        await client.connect();

        // Query example
        const res = await client.query('SELECT * FROM patients;');
        const rows = res.rows;

        return json({ success: true, data: rows });
    } catch (error) {
        console.error('Failed to query PostgreSQL:', error);
        return json({ success: false, error: (error as Error).message });
    } finally {
        await client.end();
    }
}

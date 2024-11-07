import type { RequestHandler } from '@sveltejs/kit';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = open({
  filename: 'static/db/test.db',
  driver: sqlite3.Database
});

export const GET: RequestHandler = async ({ url }) => {
    const db = await dbPromise;
    
    // Get pagination parameters from the query string
    const limit = Number(url.searchParams.get('limit')) || 50;
    const offset = Number(url.searchParams.get('offset')) || 0;
  
    try {
      const patients = await db.all('SELECT * FROM patients LIMIT ? OFFSET ?', [limit, offset]);
      return new Response(JSON.stringify(patients), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return new Response(JSON.stringify({ error: 'Error fetching data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };

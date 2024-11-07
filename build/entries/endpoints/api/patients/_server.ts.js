import { open } from "sqlite";
import sqlite3 from "sqlite3";
const dbPromise = open({
  filename: "static/db/test.db",
  driver: sqlite3.Database
});
const GET = async () => {
  try {
    const db = await dbPromise;
    const patients = await db.all("SELECT * FROM patients");
    return new Response(JSON.stringify(patients), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch patients" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  GET
};

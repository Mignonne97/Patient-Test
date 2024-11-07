import { open } from "sqlite";
import sqlite3 from "sqlite3";
const dbPromise = open({
  filename: "static/db/test.db",
  driver: sqlite3.Database
});
const GET = async () => {
  const db = await dbPromise;
  try {
    const countResult = await db.get("SELECT COUNT(*) as total FROM patients");
    return new Response(JSON.stringify({ total: countResult.total }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching total records:", error);
    return new Response(JSON.stringify({ error: "Error fetching total records" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  GET
};

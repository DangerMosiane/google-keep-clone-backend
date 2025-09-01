import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";
import { processDueReminders } from "./controllers/notes.controller.js";


const PORT = process.env.PORT || 4000;


const server = app.listen(PORT, () => {
console.log(`🚀 API ready on http://localhost:${PORT}`);
});


// Simple in-process reminder loop (checks every 60s)
setInterval(async () => {
try {
const count = await processDueReminders();
if (count > 0) console.log(`Processed ${count} due reminder(s).`);
} catch (e) {
console.error("Reminder loop error", e);
}
}, 60_000);


process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
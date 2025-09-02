1. cd keep-backend
2. Make a .env file with these values PORT=4000, DATABASE_URL="postgresql://postgres:postgres@localhost:5432/keep?schema=public", CORS_ORIGIN=http://localhost:3000
3. Install all dependencies
4. Run Prisma migrations with npx prisma migrate dev
5. Start the server with npm run dev

# Dockerfile
FROM node:20-alpine
WORKDIR /app


# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund


# Copy sources
COPY prisma ./prisma
COPY src ./src
COPY .env.example ./.env


# Generate Prisma client
RUN npx prisma generate


EXPOSE 4000
CMD ["sh", "-c", "npx prisma db push && node src/server.js"]
# Stage 1: Install dependencies and build
FROM node:22.17.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the server
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
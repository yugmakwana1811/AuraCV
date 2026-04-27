FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm ci

COPY . .
WORKDIR /app/apps/api
RUN npm run prisma:generate && npm run build

FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json /app/apps/api/package.json
COPY --from=builder /app/apps/web/package.json /app/apps/web/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api /app/apps/api

WORKDIR /app/apps/api
EXPOSE 4000
CMD ["sh", "-c", "npm run prisma:generate && npm run prisma:migrate && npm run start:prod"]

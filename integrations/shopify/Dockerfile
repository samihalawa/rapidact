FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npx prisma generate

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=file:/data/shopify.db

EXPOSE 3000

CMD ["npm", "run", "docker-start"]

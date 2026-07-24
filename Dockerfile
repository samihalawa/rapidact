# RapidAct — full-stack image for Coolify (GitHub-repo deploys)
FROM node:20-bookworm-slim AS base
WORKDIR /app

# 1) Dependencies (cached layer)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# 2) Build frontend + bundle server
FROM deps AS build
COPY . .
RUN npm run build

# 3) Runtime
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"]

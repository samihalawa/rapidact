# RapidAct — full-stack image for Coolify (GitHub-repo deploys)
FROM node:22-bookworm-slim AS base
WORKDIR /app

# 1) Dependencies (cached layer). npm 10.8 (node:20 image) crashes on this
# lockfile with "Exit handler never called" — node:22 npm + ci||install fallback.
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

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

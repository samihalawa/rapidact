# RapidAct — runtime-only image for Coolify (GitHub-repo deploys)
# dist/ is built and committed from CI/local, so this image needs no npm install.
# (npm 10.x crashes on this build server; bundling removes the problem entirely.)
FROM node:22-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY dist ./dist

EXPOSE 3000
CMD ["node", "dist/boot.js"]

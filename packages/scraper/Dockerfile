# ====================================
# EduFlow AI - Scraper Service Dockerfile
# ====================================

FROM node:20-alpine

RUN apk add --no-cache libc6-compat chromium

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy package.json files
COPY packages/scraper/package.json ./packages/scraper/
COPY packages/database/package.json ./packages/database/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/scraper ./packages/scraper
COPY packages/database ./packages/database

# Generate Prisma client
RUN cd packages/database && pnpm prisma generate

# Build scraper
RUN pnpm turbo run build --filter=scraper

WORKDIR /app/packages/scraper

CMD ["node", "dist/cli.js", "run"]

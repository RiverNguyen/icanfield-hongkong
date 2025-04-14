FROM node:21.7.3 AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm i; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .

# Ensure .next/cache directory exists and has the correct permissions
RUN mkdir -p /app/.next/cache/images && chmod -R 755 /app/.next/cache

# Environment variables must be present at build time
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
ARG NEXT_PUBLIC_API_ACF
ENV NEXT_PUBLIC_API_ACF=${NEXT_PUBLIC_API_ACF}
ARG NEXT_PUBLIC_API_CF7
ENV NEXT_PUBLIC_API_CF7=${NEXT_PUBLIC_API_CF7}
ARG NEXT_PUBLIC_API_VERSION
ENV NEXT_PUBLIC_API_VERSION=${NEXT_PUBLIC_API_VERSION}
ARG NEXT_PUBLIC_PASSPORT
ENV NEXT_PUBLIC_PASSPORT=${NEXT_PUBLIC_PASSPORT}
ARG NEXT_PUBLIC_API_PASSPORT
ENV NEXT_PUBLIC_API_PASSPORT=${NEXT_PUBLIC_API_PASSPORT}
ARG NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}


# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p /app/.next/cache
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/cache ./.next/cache
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --chown=nextjs:nodejs --from=builder /app/ ./

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
ARG NEXT_PUBLIC_API_ACF
ENV NEXT_PUBLIC_API_ACF=${NEXT_PUBLIC_API_ACF}
ARG NEXT_PUBLIC_API_CF7
ENV NEXT_PUBLIC_API_CF7=${NEXT_PUBLIC_API_CF7}
ARG NEXT_PUBLIC_API_VERSION
ENV NEXT_PUBLIC_API_VERSION=${NEXT_PUBLIC_API_VERSION}
ARG NEXT_PUBLIC_PASSPORT
ENV NEXT_PUBLIC_PASSPORT=${NEXT_PUBLIC_PASSPORT}
ARG NEXT_PUBLIC_API_PASSPORT
ENV NEXT_PUBLIC_API_PASSPORT=${NEXT_PUBLIC_API_PASSPORT}
ARG NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}


# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]

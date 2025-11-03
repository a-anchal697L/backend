# ------------------------------
# Base Image for Build
# ------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build TypeScript
COPY . .
RUN npm run build


# ------------------------------
# Runtime Image (lighter)
# ------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and built code from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Copy .env from your local project (not from builder)
COPY .env ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 5000

CMD ["node", "dist/server.js"]

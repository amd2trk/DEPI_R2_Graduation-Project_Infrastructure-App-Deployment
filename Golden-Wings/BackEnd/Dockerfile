# Stage 1: Build the TypeScript application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies (including devDependencies for tsc)
COPY package.json package-lock.json ./
RUN npm ci

# Copy TypeScript config and source code
COPY tsconfig.json .
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm exec tsc -- -p tsconfig.json

# Stage 2: Setup production environment
FROM node:18-alpine
WORKDIR /app

# Copy production dependencies metadata
COPY package.json package-lock.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled JavaScript code from build stage
COPY --from=build /app/dist ./dist

# Application listens on port defined by PORT env var (e.g., 8080)
# Make sure this is set via Kubernetes later. Defaulting here is optional.
ENV PORT=8080
EXPOSE 8080

# Command to run the application
CMD [ "node", "dist/app.js" ]

# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Set the build-time environment variable for the API URL
# This will be provided by the CI/CD pipeline, e.g., --build-arg REACT_APP_API_BASE_URL=http://backend-service:8080/api/v1/
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build the production application
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from the build stage
COPY --from=build /app/build .

# Optional: Copy a custom Nginx configuration if needed (e.g., for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]

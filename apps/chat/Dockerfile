# /docs/Dockerfile

# Build stage
FROM node:18-alpine AS builder
WORKDIR /docs
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# Serve the static site
FROM nginx:alpine
COPY --from=builder /docs/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

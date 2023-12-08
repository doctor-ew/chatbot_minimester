# Use the official Node.js 18 image as a parent image
FROM node:18.19.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json file
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Specify the command to run when the container starts
CMD ["pnpm", "start"]

# Expose the port your app runs on
EXPOSE 4000

# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5454

# Start the backend
CMD ["npm", "run", "dev"]

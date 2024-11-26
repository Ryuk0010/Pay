# Use a base image for Node.js
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and tsconfig.json
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY src/ ./src/


# Compile TypeScript files to JavaScript
RUN npx esbuild ./src/index.ts --bundle --platform=node --outfile=dist/index.js  # This will use the tsconfig.json to compile the TypeScript files

# Expose the internal backend port
EXPOSE 3003

# Command to run the application
CMD ["node", "dist/index.js"]  # Assuming the compiled JS files are in the 'dist' folder

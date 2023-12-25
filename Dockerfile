# # Stage 1: Build the Angular App
# FROM node:18.0.0-alpine AS builder
# WORKDIR /app
# # Install the Ionic CLI globally
# RUN npm install -g @ionic/cli

# # Copy the package.json and package-lock.json files to the container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Stage 2: Build the Ionic React App
# WORKDIR /app

# # Copy the Ionic React app source code to the container
# COPY . .

# # Build the Ionic React app for production
# RUN ionic build --prod

# # Stage 3: Serve the Ionic React App using a Simple HTTP Server
# FROM nginx:alpine

# # Remove the default NGINX configuration
# RUN rm -rf /etc/nginx/conf.d

# # Copy the built Ionic React app from the previous stage into the NGINX webroot
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose the NGINX port to access the application
# EXPOSE 80

# # Start NGINX when the container runs
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the Angular App
FROM node:18.0.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package.json package-lock.json ./

# install angular cli globally
RUN npm install -g @ionic/cli

# Install project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the  app
RUN npm run build:prod
# Stage 3: Serve the Ionic React App using a Simple HTTP Server
FROM nginx:alpine

# Copy the built Ionic React app from the previous stage into the NGINX webroot
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the NGINX port to access the application
EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
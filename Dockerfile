# Stage 1: Development
FROM node:alpine AS dev

# Install necessary packages using the Alpine package manager 'apk'
RUN apk update && \
    apk add --no-cache tesseract-ocr tesseract-ocr-data-eng && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json for npm install
COPY package*.json ./

# Install both production and development dependencies
RUN npm install --only=development

# Copy the entire application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:alpine AS prod

# Install necessary packages using the Alpine package manager 'apk'
RUN apk update && \
    apk add --no-cache tesseract-ocr tesseract-ocr-data-eng && \
    rm -rf /var/cache/apk/*

# Set environment variables
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json for npm install
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=prod

# Copy the built application files from the development stage
COPY --from=dev /usr/src/app/dist ./dist

# Set the command to start the application
CMD ["node", "dist/main"]
# Dockerfile

FROM node:16-alpine as build

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy all local files into the image.
COPY . .

RUN npm run build

WORKDIR /app/build
EXPOSE 3000
CMD ["node", "./index.js"]
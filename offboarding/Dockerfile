FROM node:12-alpine

RUN npm config set unsafe-perm true && \
    npm config set @geopagos:registry http://npm.geopagoslan.net

ENV NODE_ENV=production
WORKDIR /app

# Install app dependencies
COPY . .

RUN yarn install --prod

CMD [ "yarn", "dockerized:build" ]
EXPOSE 3000
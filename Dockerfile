FROM node:8.9.4

ENV NODE_ENV production

RUN apt-get update && \
    apt-get install -y bash git build-essential \
    automake autoconf make g++ libtool libcairo2-dev \
    && npm install -g node-gyp --loglevel warn \
    && mkdir -p /usr/src/app && mkdir -p /usr/src/app

# Add app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
# RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

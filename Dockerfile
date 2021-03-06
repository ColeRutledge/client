# Base

FROM node:12-alpine as base

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# FOR MATERIAL TABLE
RUN apk add git

RUN npm ci && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH


# Development

FROM base as dev

ENV NODE_ENV=development

WORKDIR /app

RUN npm install --only=dev

CMD ["npm", "start"]


# Build

# FROM base as build

# ENV REACT_APP_API_SERVER_BASE_URL=https://pure-search.herokuapp.com

# WORKDIR /app

# COPY . .

# # MAY NOT BE NEEDED (FOR MATERIAL TABLE)
# RUN apk add git

# RUN npm install && npm run build

# RUN npm install -g serve

# CMD ["serve", "-s", "build"]

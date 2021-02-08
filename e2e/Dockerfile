FROM cypress/base:10
WORKDIR /app

ENV CI=1

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --no-progress --non-interactive

RUN npx cypress verify
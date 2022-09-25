FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production

CMD ["/usr/bin/node", "backend/bin/www"]
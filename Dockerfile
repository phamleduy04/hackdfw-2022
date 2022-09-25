# Use offical node to install dependencies
FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production

CMD ["npm", "start"]
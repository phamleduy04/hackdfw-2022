FROM node:alpine

WORKDIR /home/container
COPY . .
RUN yarn install --production

CMD ["npm", "run", "start"]
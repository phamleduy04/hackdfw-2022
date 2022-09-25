FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production

CMD ["cd backend && npm run start"]
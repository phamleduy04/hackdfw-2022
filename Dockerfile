FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production


WORKDIR /home/container/backend
CMD ["run.sh"]
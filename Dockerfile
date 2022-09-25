# Use offical node to install dependencies
FROM node:alpine as compiler

WORKDIR /home/container
COPY . .
RUN yarn install --production

# Use distroless image as the base image
FROM gcr.io/distroless/nodejs:16

WORKDIR /home/container
COPY --from=compiler /home/container ./
USER 1000
CMD ["npm", "run", "start"]
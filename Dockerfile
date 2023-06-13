# Stage 0, "build-stage"
FROM node:18.16 as build-stage

WORKDIR /storage

COPY ./nginx.conf /nginx.conf

COPY package*.json /storage/

RUN yarn --ignore-scripts

COPY ./ /storage/

RUN yarn build-storybook

# Stage 1, "deploy-stage"
FROM nginx:1.22.1 as deploy-stage

COPY --from=build-stage /storage/storybook-static/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

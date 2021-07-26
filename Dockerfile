FROM node:15-buster as dev
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80"]
EXPOSE 80/tcp
WORKDIR /app
COPY package*.json ./
RUN npm install --loglevel verbose && \
    npm install -g @angular/cli --loglevel verbose
COPY . .

FROM dev AS dev-dist
RUN ng build --output-path=dist

FROM nginx:1.19 AS prod
COPY --from=dev-dist /app/dist /usr/share/nginx/html

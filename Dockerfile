FROM node:latest
WORKDIR /app
COPY . /app
EXPOSE 4000
RUN npm install
ENTRYPOINT ["npm", "run", "serve:prod"]
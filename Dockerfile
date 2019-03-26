FROM node:10.15.0-slim

WORKDIR /runtime

COPY ./package.json ./package-lock.json /runtime/
RUN npm ci --production
COPY server.js /runtime/
COPY src/ /runtime/src/

ENV PORT 8000
EXPOSE 8000
ENV NODE_PATH /runtime/src

CMD [ "npm", "start" ]
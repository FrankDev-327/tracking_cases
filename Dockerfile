FROM node:alpine As development

USER root

# install tesseract
RUN apt-get clean && \
    apt-get -y update && \
    apt-get install -y --force-yes \
    tesseract-ocr \
    tesseract-ocr-hrv && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:alpine as production



# install tesseract
RUN apt-get clean && \
    apt-get -y update && \
    apt-get install -y --force-yes \
    tesseract-ocr \
    tesseract-ocr-hrv && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
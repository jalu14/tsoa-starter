FROM node:10-alpine
ARG tag=develop

# Create app directory
WORKDIR /app

# Copy app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --production && npm cache clean --force

# Bundle app source
COPY . /app

RUN npm install -g json
RUN npm run build:tsoa
RUN npm run build
RUN json -I -f ./dist/swagger.json -e this.info.version="'${tag}'"
RUN npm uninstall -g json

# Expose the port
EXPOSE 3000

# Start command
CMD npm start
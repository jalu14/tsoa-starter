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

RUN npm run build

# Expose the port
EXPOSE 8080

# Start command
CMD npm start
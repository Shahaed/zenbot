from node:12
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get -q update && \
apt-get install -y software-properties-common && \
apt-get -q update && \
add-apt-repository -r ppa:jonathonf/ffmpeg-4 && \
apt-get -q update && \
apt-get install -y ffmpeg && \
npm install --only=production


# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY secrets/ ./secrets/
COPY dist ./dist/

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
FROM node:14-slim

WORKDIR /usr .

RUN apt update && apt install bash python g++ make git -y && rm -rf /var/cache/apt/*

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "server" ]

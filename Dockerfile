FROM node:10

WORKDIR /Appointment-Scheduler

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]

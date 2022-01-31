# Interview Scheduler Project

Interview Scheduler is a single-page application that lets you schedule an appointment at a time and interviewer of choosing.

A single-page REACT based scheduler that uses HTML, JSX and CSS/SASS along with some dependencies.


!["Homepage of Interview Scheduler!"](https://github.com/snoopy55619819/tweeter/blob/master/public/images/Screen%20Shot%202021-12-21%20at%2010.29.19%20AM.png?raw=true)

___
## Getting Started
There are two methods of accessing the application:

1. Visit website online hosted by Netlify: [Custom Interview Scheduler](https://customscheduler.netlify.app/)

<p align="center">
  or
</p>

2. Clone the Scheduler and the Scheduler-api repository and run application locally

___
## 1 - Using the application online

1. Visit website online here: [Custom Interview Scheduler](https://customscheduler.netlify.app/)

    URL: https://customscheduler.netlify.app/

    *Note: Webpage data may take a few seconds to load up on first use due to the database needing to fire up first. 


## 2 - Using the application locally

1. Fork/clone the [scheduler-api](https://github.com/snoopy55619819/scheduler-api) repo and follow steps there to setup the api server.

2. Fork/Clone the [Interview Scheduler](https://github.com/snoopy55619819/scheduler) repo to your local device.
```js
git clone git@github.com:snoopy55619819/scheduler.git
```

3. Install dependencies using the `npm install` command.
```js
npm install
```
4. Start the web server (make sure the scheduler-api is running also) using the `npm run local` command. The app will be served at <http://localhost:8080/>. Can modify the port in files if needed.
```js
npm start
```

5. Go to <http://localhost:8080/> in your browser.

6. Schedule away!

## Dependencies

- Express
- Node 5.10.x or above
- Body parser
- Chance
- Md5

# Development/Testing
## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API endpoints

### Local endpoints:
[/api/days](http://localhost:8081/api/days)

[/api/interviewers](http://localhost:8081/api/interviewers)

[/api/appointments](http://localhost:8081/api/appointments)

### Heroku endpoints:
[/api/days](https://interview-scheduler-nikhil.herokuapp.com/api/days)

[/api/interviewers](https://interview-scheduler-nikhil.herokuapp.com/api/interviewers)

[/api/appointments](https://interview-scheduler-nikhil.herokuapp.com/api/appointments)
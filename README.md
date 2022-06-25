<h1 align="center">Node.JS Exam System CITC</h1>

## Description:

Book Store is a simple single page application (SPA) that lets you buy, rate and leave your comment for all the books that are available in the store.
You can also see all of your purchased books history or create your own favorite books list.

## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [Mongodb](https://www.mongodb.com/try/download/community) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Node.JS-Exam-System-CITC.git
```

`Step 2` : Enter the project file then install package

```
npm i
```

<h3 align="center">To help you understand the project :</h3>

## Folder Structure

```bash
├── src
│   ├── controllers
│   │   ├── authController.ts => `for handel auth function`
│   │   │── .ts => ``
│   │   └── .ts => ``
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for handel auth function`
│   │   │── notFoundMiddleware.ts => `for handel auth function`
│   │   │── .ts => ``
│   │   └── errorMiddleware.ts => `for handel auth function`
│   │
│   │
│   ├── routes
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel auth route`
│   │   │   └── .ts => ``
│   │   │
│   │   └── routes.ts => `import all routes and export it to main index`
│   │
│   ├── tests  => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   │
│   │   ├── indexSpec.ts => `for test endpoint api`
│   │   └── .ts => ``
│   │
│   │
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/175783536-ffd35e77-90df-4531-ab0b-70f804822e6a.jpg" alt="Build Status">
</p>

`Step 3` : To run project

```
node run start
```

`Step 4` : Open the browser and click : [http://localhost:8080](http://localhost:8080)

<hr>

To run eslint to check error

```
npm run lint
```

To run eslint and auto fixed error

```
npm run lint:f
```

To compile the TS code

```
npm run build
```

To run the JS code

```
node dist/index.js
```

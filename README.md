<h1 align="center">Node.JS Exam System CITC</h1>
<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/175972048-ee51e43d-2a19-47fb-9ce6-50e2941d2ddb.png" alt="Build Status">

## Description:

The objective of the system is to design an exam for a course. The course is specified by its name, and the number of its chapters. Each question has 3 choices one of which is the correct answer. Also, the question has two parameters its difficulty: difficult or simple, and its objective: reminding, understanding, and creativity 12 Questions must be assigned to every chapter. All types of questions must be included equally.

## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [Mongodb](https://www.mongodb.com/try/download/community) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Node.JS-Exam-System-CITC.git
```

`Step 2` : Enter the project file then install package

```
npm i
```

<h3 align="center">To help you understand the project</h3>

## Folder Structure

```bash
├── src
│   ├── controllers
│   │   ├── authController.ts => `for handel authentication function`
│   │   │── chapterController.ts => `for handel chapter function`
│   │   │── courseController.ts => `for handel course function`
│   │   │── questionController.ts => `for handel question function`
│   │   └── studentExamController.ts => `for handel student exam function`
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for log url, method and statue of requests`
│   │   │── notFoundMiddleware.ts => `for not Found Middleware`
│   │   │── headerAccess.ts => `for handel Access to node Middleware`
│   │   └── errorMiddleware.ts => `for error Middleware`
│   │
│   │
│   ├── models
│   │   ├── chapterSchema.ts => `for handel chapter Schema`
│   │   │── courseSchema.ts => `for handel course Schema`
│   │   │── questionSchema.ts => `for handel question Schema`
│   │   │── studentExamSchema.ts => `for handel student Exam Schema`
│   │   └── userSchema.ts => `for handel user Schema`
│   │
│   │
│   ├── routes
│   │   ├── admin
│   │   │   └── adminRouter.ts => `for handel admin route`
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel authentication route`
│   │   │   │── chapterRouter.ts => `for handel chapter route`
│   │   │   │── courseRouter.ts => `for handel course route`
│   │   │   │── questionRouter.ts => `for handel question route`
│   │   │   └── studentExamRouter.ts => `for handel student exam route`
│   │   └── routes.ts => `import all routes and export it to index`
│   │
│   │
│   ├── tests => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   └── indexSpec.ts => `for test endpoint api`
│   │
│   │
│   ├── utilities
│   │   │── checkTokens.ts => `for Request check Tokens`
│   │   └── validateRequest.ts => `for validate Request`
│   │
│   │
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/175788607-24ef1566-169e-47ce-ba39-30045b905346.jpg" alt="Build Status">
</p>

`Step 3` : To run project

```
node run start
```

`Step 4` : Open the browser for admin control page and click : [http://localhost:8080/admin](http://localhost:8080/admin)

`Step 5` : Open [postman](https://www.postman.com/downloads/) and import : [Database_collation](https://github.com/MohamedAlabasy/Node.JS-Exam-System-CITC/blob/main/Database_collation.json) You will find it in the project file.

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

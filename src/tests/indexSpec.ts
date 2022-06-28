import supertest, { SuperTest, Test, Response } from 'supertest';
import app from '../index'


const request: SuperTest<Test> = supertest(app);

describe('check Endpoint API', (): void => {
    describe('check user Endpoint', (): void => {
        it('POST /user/register', async (): Promise<void> => {
            const response: Response = await request.post('/user/register')
                .send({
                    'email': 'eng.mohamed.alabasy@gmail.com',
                    'password': '123456789Aa+!',
                    "national_id": 12347618901234,
                    "identifier": 1234567890,
                    "type": "teacher"
                })
            expect(response.status).toBe(200);
        });

        it('POST /user/register', async (): Promise<void> => {
            const response: Response = await request.post('/user/register')
                .send({
                    'email': 'alabasy@gmail.com',
                    'password': '123456789Aa+!',
                    "national_id": 22347618901234,
                    "identifier": 2234567890,
                    "type": "student"
                })
            expect(response.status).toBe(200);
        });

        it('POST /user/login', async (): Promise<void> => {
            const response: Response = await request.post('/user/login')
                .send({
                    'email': 'eng.mohamed.alabasy@gmail.com',
                    "password": "123456789Aa+!",
                });
            expect(response.status).toBe(200);
        });
        it('GET /user', async (): Promise<void> => {
            const response: Response = await request.get('/user')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
        it('POST /user/logout', async (): Promise<void> => {
            const response: Response = await request.post('/user/logout')
                .send({
                    "_id": 0
                })
            expect(response.status).toBe(200);
        });
    });

    describe('check wrong login Endpoint', (): void => {
        it('POST /loginAnyThing', async (): Promise<void> => {
            const response: Response = await request.post('/loginAnyThing');
            expect(response.status).toBe(404);
        });
    });

    describe('check course Endpoint', (): void => {
        it('POST /course', async (): Promise<void> => {
            const response: Response = await request.post('/course')
                .send({
                    "name": "Node",
                    "number_characters": 4,
                    "teacher": 0
                })
            expect(response.status).toBe(200);
        });

        it('GET /course/all', async (): Promise<void> => {
            const response: Response = await request.get('/course/all')
            expect(response.status).toBe(200);
        });

        it('GET /course', async (): Promise<void> => {
            const response: Response = await request.get('/course')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
        it('PATCH /course', async (): Promise<void> => {
            const response: Response = await request.patch('/course')
                .send({
                    "_id": 0,
                    "name": "MongoDB",
                    "number_characters": 8,
                    "teacher": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('check chapter Endpoint', (): void => {
        it('POST /chapter', async (): Promise<void> => {
            const response: Response = await request.post('/chapter')
                .send({
                    "name": "introduction to node",
                    "course": 0
                })
            expect(response.status).toBe(200);
        });

        it('GET /chapter/all', async (): Promise<void> => {
            const response: Response = await request.get('/chapter/all')
            expect(response.status).toBe(200);
        });

        it('GET /chapter', async (): Promise<void> => {
            const response: Response = await request.get('/chapter')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
        it('PATCH /chapter', async (): Promise<void> => {
            const response: Response = await request.patch('/chapter')
                .send({
                    "_id": 0,
                    "name": "introduction to node ?",
                    "course": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('check question Endpoint', (): void => {
        it('POST /question', async (): Promise<void> => {
            const response: Response = await request.post('/question')
                .send({
                    "question": " Where Node.js can be used ?",
                    "choice_1": "movies app",
                    "choice_2": "Real-Time app",
                    "choice_3": "al app",
                    "correct_answer": 2,
                    "is_difficult": "false",
                    "chapter": 0
                })
            expect(response.status).toBe(200);
        });

        it('GET /question/all', async (): Promise<void> => {
            const response: Response = await request.get('/question/all')
            expect(response.status).toBe(200);
        });

        it('GET /question', async (): Promise<void> => {
            const response: Response = await request.get('/question')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
        it('PATCH /question', async (): Promise<void> => {
            const response: Response = await request.patch('/question')
                .send({
                    "_id": 0,
                    "question": " Where Node.js can be used ?",
                    "choice_1": "movies app",
                    "choice_2": "Distributed Systems",
                    "choice_3": "al app",
                    "correct_answer": 2,
                    "is_difficult": "false",
                    "chapter": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('check exam Endpoint', (): void => {
        it('POST /exam', async (): Promise<void> => {
            const response: Response = await request.post('/exam')
                .send({
                    "degree": 90,
                    "student": 0,
                    "course": 0
                })
            expect(response.status).toBe(200);
        });

        it('GET /exam/all', async (): Promise<void> => {
            const response: Response = await request.get('/exam/all')
            expect(response.status).toBe(200);
        });

        it('GET /exam', async (): Promise<void> => {
            const response: Response = await request.get('/exam')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
        it('PATCH /exam', async (): Promise<void> => {
            const response: Response = await request.patch('/exam')
                .send({
                    "_id": 0,
                    "degree": 60,
                    "student": 0,
                    "course": 0
                });
            expect(response.status).toBe(200);
        });
    });

});

describe('check delete Endpoint API', (): void => {

    describe('delete question', (): void => {
        it('DELETE /exam', async (): Promise<void> => {
            const response: Response = await request.delete('/exam')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('delete question', (): void => {
        it('DELETE /question', async (): Promise<void> => {
            const response: Response = await request.delete('/question')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('delete chapter', (): void => {
        it('DELETE /chapter', async (): Promise<void> => {
            const response: Response = await request.delete('/chapter')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('delete course', (): void => {
        it('DELETE /course', async (): Promise<void> => {
            const response: Response = await request.delete('/course')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
    });

    describe('delete user', (): void => {
        it('DELETE /user', async (): Promise<void> => {
            const response: Response = await request.delete('/user')
                .send({
                    "_id": 0
                });
            expect(response.status).toBe(200);
        });
    });
});

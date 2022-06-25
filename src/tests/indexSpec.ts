import supertest, { SuperTest, Test, Response } from 'supertest';
import app from '../index'


const request: SuperTest<Test> = supertest(app);

describe('check Endpoint API', (): void => {

    describe('check login Endpoint', (): void => {
        it('POST /login', async (): Promise<void> => {
            const response: Response = await request.post('/login');
            expect(response.status).toBe(200);
        });
    });

    describe('check wrong login Endpoint', (): void => {
        it('POST /loginAnyThing', async (): Promise<void> => {
            const response: Response = await request.post('/loginAnyThing');
            expect(response.status).toBe(404);
        });
    });




});

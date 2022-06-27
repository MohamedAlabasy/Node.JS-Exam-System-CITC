import supertest, { SuperTest, Test, Response } from 'supertest';
import app from '../index'


const request: SuperTest<Test> = supertest(app);

describe('check Endpoint API', (): void => {

    describe('check user Endpoint', (): void => {
        it('POST /user/login', async (): Promise<void> => {
            const response: Response = await request.post('/user/login');
            expect(response.status).toBe(500);
        });
        it('POST /user/register', async (): Promise<void> => {
            const response: Response = await request.post('/user/register');
            expect(response.status).toBe(500);
        });
        it('GET /user', async (): Promise<void> => {
            const response: Response = await request.get('/user');
            expect(response.status).toBe(500);
        });
        it('DELETE /user/logout', async (): Promise<void> => {
            const response: Response = await request.delete('/user');
            expect(response.status).toBe(500);
        });
        it('POST /user/logout', async (): Promise<void> => {
            const response: Response = await (await request.post('/user/logout')).body({
                "_id":0
            });
            expect(response.status).toBe(500);
        });
    });

    describe('check wrong login Endpoint', (): void => {
        it('POST /loginAnyThing', async (): Promise<void> => {
            const response: Response = await request.post('/loginAnyThing');
            expect(response.status).toBe(404);
        });
    });

});

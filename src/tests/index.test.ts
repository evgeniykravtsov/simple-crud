// import { v4 as uuidv4 } from 'uuid';
import { Server } from '../index';
import request from 'supertest';
import { validate as uuidValidate } from 'uuid';

const STANDART_ROUTE = '/api/users';
const validUserser = { username: 'testName', age: 12, hobbies: [] };

describe('First Test Scenario', () => {
  it('get all users', async () => {
    await request(Server).get(STANDART_ROUTE).expect(200);
  });

  it('add new user with unvalid body', async () => {
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send({ test: 'test' })
      .expect(404);
  });

  it('add new user with unvalid body', async () => {
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send({ username: 'testName', age: 12, hobbies: 'testUnvalid Hobbies' })
      .expect(404);
  });

  it('add new user with valid body', async () => {
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send(validUserser)
      .expect(201)
      .expect(({ body }) => {
        const { id } = body;
        const expectedResult = { ...validUserser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('add new user with valid body', async () => {
    const validUserser = { username: 'testName', age: 12, hobbies: [] };
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send(validUserser)
      .expect(201)
      .expect(({ body }) => {
        const { id } = body;
        const expectedResult = { ...validUserser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('add new user and delete this user', async () => {
    let idNewUser = '';
    await request(Server).delete(STANDART_ROUTE).expect(400);

    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send(validUserser)
      .expect(201)
      .expect(({ body }) => {
        const { id } = body;
        idNewUser = id;
        const expectedResult = { ...validUserser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
    await request(Server)
      .delete(STANDART_ROUTE + '/' + idNewUser)
      .expect(200);
  });
});

describe('Second Test Scenario', () => {
  let idNewUser = '';

  it('get all users', async () => {
    await request(Server).get(STANDART_ROUTE).expect(200);
  });

  it('add new user with valid body', async () => {
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send(validUserser)
      .expect(201)
      .expect(({ body }) => {
        const { id } = body;
        idNewUser = id;
        const expectedResult = { ...validUserser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('change new user', async () => {
    const updatedUser = {
      username: 'testNameNew',
      age: 12323,
      hobbies: ['newHobbie'],
    };
    await request(Server)
      .put(STANDART_ROUTE + '/' + idNewUser)
      .set('Content-type', 'application/json')
      .send(updatedUser)
      .expect(200)
      .expect(({ body }) => {
        const { id } = body;
        const expectedResult = { ...updatedUser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('delete this user', async () => {
    await request(Server)
      .delete(STANDART_ROUTE + '/' + idNewUser)
      .expect(200);
  });
});

describe('Third Test Scenario', () => {
  let idNewUser = '';

  it('get all users', async () => {
    await request(Server).get(STANDART_ROUTE).expect(200);
  });

  it('add new user with valid body', async () => {
    await request(Server)
      .post(STANDART_ROUTE)
      .set('Content-type', 'application/json')
      .send(validUserser)
      .expect(201)
      .expect(({ body }) => {
        const { id } = body;
        idNewUser = id;
        const expectedResult = { ...validUserser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('change new user', async () => {
    const updatedUser = {
      username: 'testNameNew',
      age: 12323,
      hobbies: ['newHobbie'],
    };
    await request(Server)
      .put(STANDART_ROUTE + '/' + idNewUser)
      .set('Content-type', 'application/json')
      .send(updatedUser)
      .expect(200)
      .expect(({ body }) => {
        const { id } = body;
        const expectedResult = { ...updatedUser, id };
        expect(uuidValidate(id)).toBeTruthy;
        expect(body).toEqual(expectedResult);
      });
  });

  it('get new  user for id', async () => {
    await request(Server)
      .get(STANDART_ROUTE + '/' + idNewUser)
      .expect(200);
  });

  it('delete this user', async () => {
    await request(Server)
      .delete(STANDART_ROUTE + '/' + idNewUser)
      .expect(200);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /user', async () => {
    const createUser = {
      name: 'John Doe',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 30,
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUser)
      .expect(201);

    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: createUser.name,
      email: createUser.email,
      age: createUser.age,
    });
  });

  it('POST /user/add', async () => {
    const createUser = {
      name: 'John Doe',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 30,
    };

    const response = await request(app.getHttpServer())
      .post('/user/add')
      .send(createUser)
      .expect(201);

    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: createUser.name,
      email: createUser.email,
      age: createUser.age,
    });
  });

  it('GET /user/:id', async () => {
    const createUser = {
      name: 'Jane Doe',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 25,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: userId,
      name: createUser.name,
      email: createUser.email,
      age: createUser.age,
    });
  });

  it('PUT /user/:id', async () => {
    const createUser = {
      name: 'Alice Doe',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 28,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    const updateUser = {
      name: 'Alice Johnson',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 29,
    };

    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updateUser)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: userId,
      name: updateUser.name,
      email: updateUser.email,
      age: updateUser.age,
    });
  });

  it('DELETE /user/:id', async () => {
    const createUser = {
      name: 'Bob Doe',
      email: `${new Date().toISOString()}.jane.doe@example.com`,
      age: 35,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/user')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    await request(app.getHttpServer()).delete(`/user/${userId}`).expect(200);

    await request(app.getHttpServer()).get(`/user/${userId}`).expect(404);
  });

  it('POST /user', async () => {
    const createUser = {
      name: 90,
      email: 'mrmskjsj@emadil.com',
      age: 'jon doe',
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUser)
      .expect(409);
  });

  it('POST /user/add', async () => {
    const createUser = {
      name: 'jon doe',
      email: '2024-05-25T06:12:57.959Z.jane.doe@example.com',
      age: 30,
    };

    const response = await request(app.getHttpServer())
      .post('/user/add')
      .send(createUser)
      .expect(409);
  });

  it('GET /user/:id ', async () => {
    const nonExistentId = '664cb4ae4842121a8e50af7d';
    const response = await request(app.getHttpServer())
      .get(`/user/${nonExistentId}`)
      .expect(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });

  it('PUT /user/:id', async () => {
    const nonExistentId = '664cb4ae4842121a8e50af7d';
    const response = await request(app.getHttpServer())
      .put(`/user/${nonExistentId}`)
      .expect(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });
});

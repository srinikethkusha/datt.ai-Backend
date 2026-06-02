import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('ProductModule (e2e)', () => {
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
  it('GET /order/:_id', async () => {
    const createOrder = {
      userId: 'hsy383n',
      productId: '3500uiw',
      quntity: '4',
      totalPrice: 12000,
    };

    const createOrderResponse = await request(app.getHttpServer())
      .post('/order')
      .send(createOrder)
      .expect(201);

    const orderId = createOrderResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/order/${orderId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: orderId,
          userId: createOrder.userId,
          productId: createOrder.productId,
          quntity: createOrder.quntity,
          totalPrice: createOrder.totalPrice,
        }),
      ]),
    );
  });

  it('PUT /order/:id', async () => {
    const updateOrder = {
      userId: 'hsy383n',
      productId: '3500uiw',
      quantity: 4,
      totalPrice: 12000,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/order')
      .send(updateOrder)
      .expect(201);

    const orderId = createUserResponse.body._id;

    const updateUser = {
      quantity: 89,
      totalPrice: 100,
    };

    const response = await request(app.getHttpServer())
      .put(`/order/${orderId}`)
      .send(updateUser)
      .expect(200);

    expect(response.body).toMatchObject({
      quantity: 89,
      totalPrice: 100,
    });
  });

  it('POST /order', async () => {
    const addOrder = {
      userId: 'hsy383n',
      productId: '3500uiw',
      quantity: 4,
      totalPrice: 12000,
    };

    const response = await request(app.getHttpServer())
      .post('/order')
      .send(addOrder)
      .expect(201);
    const orderId = response.body._id;
    expect(response.body).toMatchObject({
      __v: 0,
      _id: orderId,
      userId: addOrder.userId,
      productId: addOrder.productId,
      quantity: addOrder.quantity,
      totalPrice: addOrder.totalPrice,
    });
  });

  it('DELETE /order/:id', async () => {
    const createOrder = {
      userId: 'hsy383n',
      productId: '3500uiw',
      quantity: 4,
      totalPrice: 12000,
    };

    const createOrderResponse = await request(app.getHttpServer())
      .post('/order')
      .send(createOrder)
      .expect(201);

    const orderId = createOrderResponse.body._id;

    await request(app.getHttpServer()).delete(`/user/${orderId}`).expect(200);

    await request(app.getHttpServer()).get(`/user/${orderId}`).expect(404);
  });

  it('PUT /order/:id', async () => {
    const createOrder = {
      userId: 'hsy383n',
      productId: '3500uiw',
      quantity: 4,
      totalPrice: 12000,
    };

    const createOrderResponse = await request(app.getHttpServer())
      .post('/order')
      .send(createOrder)
      .expect(201);

    const orderId = createOrderResponse.body._id;

    const updateOrder = {
      quantity: 43,
      totalPrice: 9000,
    };

    const response = await request(app.getHttpServer())
      .put(`/order/${orderId}`)
      .send(updateOrder)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: orderId,
      userId: createOrder.userId,
      productId: createOrder.productId,
      quantity: updateOrder.quantity,
      totalPrice: updateOrder.totalPrice,
    });
  });
});

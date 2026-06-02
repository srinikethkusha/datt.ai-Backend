import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('POST /product with valid data', async () => {
    const addProduct = {
      productName: `${new Date().toISOString()}.nikweesd`,
      productPrice: 15000,
      productDescription: 'more style more fashion',
      productType: 'shoes',
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(addProduct)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: addProduct.productName,
      productPrice: addProduct.productPrice,
      productDescription: addProduct.productDescription,
      productType: addProduct.productType,
      _id: expect.any(String),
    });
  });

  it('POST /product with invalid data', async () => {
    const addProduct = {
      productName: 345.776,
      productPrice: 2300,
      productDescription: 'more style more fashion',
      productType: 'shoes',
    };
    await request(app.getHttpServer())
      .post('/product')
      .send(addProduct)
      .expect(400);
  });

  it('GET /product/:productType', async () => {
    const createProduct = {
      productName: `${new Date().toISOString()}.rebook`,
      productPrice: 3500,
      productDescription: 'underrated footwear',
      productType: 'shoes',
    };

    const createProductResponse = await request(app.getHttpServer())
      .post('/product')
      .send(createProduct)
      .expect(201);

    const productType = createProductResponse.body.productType;
    const productId = createProductResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/product/${productType}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: productId,
          productName: createProduct.productName,
          productPrice: createProduct.productPrice,
          productDescription: createProduct.productDescription,
          productType: createProduct.productType,
        }),
      ]),
    );
  });

  it('GET /product/:productName', async () => {
    const createProduct = {
      productName: 'pulsar',
      productPrice: 809234,
      productDescription: 'only one can',
      productType: 'bike',
    };

    const createProductResponse = await request(app.getHttpServer())
      .post('/product')
      .send(createProduct)
      .expect(201);

    const productName = createProductResponse.body.productName;
    const productId = createProductResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/product/${productName}`)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: productId,
      productName: createProduct.productName,
      productPrice: createProduct.productPrice,
      productDescription: createProduct.productDescription,
      productType: createProduct.productType,
    });
  });

  it('PUT /product/:productName', async () => {
    const createProduct = {
      productName: 'pulsar',
      productPrice: 809234,
      productDescription: 'only one can',
      productType: 'bike',
    };

    const createProductResponse = await request(app.getHttpServer())
      .post('/product')
      .send(createProduct)
      .expect(201);

    const productName = createProductResponse.body.productName;
    const productId = createProductResponse.body._id;

    const updatesProduct = {
      productPrice: 9000,
      productDescription: 'nothing more',
    };

    const response = await request(app.getHttpServer())
      .put(`/product/${productName}`)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: productId,
      productName: createProduct.productName,
      productPrice: updatesProduct.productPrice,
      productDescription: updatesProduct.productDescription,
      productType: createProduct.productType,
    });
  });

  it('DELETE /product/:productName', async () => {
    const createProduct = {
      productName: 'xiomi',
      productPrice: 7094,
      productDescription: 'only redmi',
      productType: 'mobile',
    };

    const createProductResponse = await request(app.getHttpServer())
      .post('/product')
      .send(createProduct)
      .expect(201);

    const productName = createProductResponse.body.productName;

    await request(app.getHttpServer())
      .delete(`/product/${productName}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/product/${productName}`)
      .expect(404);
  });
});

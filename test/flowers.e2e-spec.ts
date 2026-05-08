import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Server } from 'http';

type FlowerResponse = {
  name: string;
  color: string;
  price: number;
};

describe('FlowersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/GET flowers`, () => {
    return request(app.getHttpServer() as unknown as Server)
      .get('/flowers')
      .set('Authorization', 'secret')
      .expect(200)
      .expect((response) => {
        // Проверяем, что в ответе есть массив цветов
        const body = response.body as unknown;
        expect(Array.isArray(body)).toBe(true);
        // Проверяем, что в массиве есть хотя бы один цвет с именем 'Rose'
        const flowers = body as FlowerResponse[];
        expect(flowers.some((flower) => flower.name === 'Rose')).toBe(true);
      });
  });

  it(`/POST flowers`, () => {
    return request(app.getHttpServer() as unknown as Server)
      .post('/flowers')
      .set('Authorization', 'secret')

      .send({
        name: 'Rose',
        color: 'Red',
        price: 10,
      })
      .expect(201)
      .expect((response) => {
        const body = response.body as unknown;
        const flower = body as FlowerResponse;
        return flower.name === 'Rose';
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

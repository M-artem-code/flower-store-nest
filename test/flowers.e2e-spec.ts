import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

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
    return request(app.getHttpServer())
      .get('/flowers')
      .set('Authorization', 'secret')
      .expect(200)
      .expect((response) => {
        // Проверяем, что в ответе есть массив цветов
        expect(Array.isArray(response.body)).toBe(true);
        // Проверяем, что в массиве есть хотя бы один цвет с именем 'Rose'
        expect(response.body.some(flower => flower.name === 'Rose')).toBe(true);
      });
  });

  it(`/POST flowers`, () => {
    return request(app.getHttpServer())
      .post('/flowers')
      .set('Authorization', 'secret')

      .send({
        name: 'Rose',
        color: 'Red',
        price: 10,
      })
      .expect(201)
      .expect((response) => {
        console.log(response.body);
        return response.body.name === 'Rose';
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

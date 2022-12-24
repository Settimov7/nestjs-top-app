import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { CreateReviewDto } from "../src/review/dto/create-review.dto";
import { Types, disconnect } from "mongoose";
import { REVIEW_NOT_FOUND_MESSAGE } from "../src/review/review.constants";
import { AuthDTO } from "../src/auth/dto/auth.dto";

const productId = new Types.ObjectId().toHexString();

const TEST_DTO: CreateReviewDto = {
  name: 'Test',
  title: 'Test title',
  description: 'Test description',
  rating: 5,
  productId,
}

const loginDTO: AuthDTO = {
  login: 'email@mail.com',
  password: '123',
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDTO);

    token = body.access_token;
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(TEST_DTO)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;

        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - fail',  () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({...TEST_DTO, rating: 0})
      .expect(400);
  });

  it('/review/byProduct/:productId (GET) - success',async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/byProduct/:productId (GET) - fail',async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/:id (DELETE) - success',() => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  });

  it('/review/:id (DELETE) - fail',() => {
    return request(app.getHttpServer())
      .delete(`/review/${new Types.ObjectId().toHexString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND_MESSAGE,
      });
  });

  afterAll(() => {
    disconnect();
  })
});

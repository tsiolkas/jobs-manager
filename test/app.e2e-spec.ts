if (!process.env.DEPLOY_ENV || process.env.DEPLOY_ENV == 'local') {
  require('dotenv').config();
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sign-up create user', () => {
    return request(app.getHttpServer())
      .post('/sign-up')
      .send({ username: 'achilleas1122', password: '1234', fullname: 'Achilleas Tsiolkas' })
      .expect(201);
  });

  it('/login login success', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: 'achilleas1122', password: '1234' })
      .expect(201)

    jwtToken = response.body.access_token
    expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })

  it('/login login failed', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ username: 'test@example.com', password: 'wrong' })
      .expect(401)

    expect(response.body.access_token).not.toBeDefined();
  })

  it('/company create company', async () => {
    const response = await request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Company1', vatNO: 34534547 })
      .expect(201)

    expect(response.body.id).toBeGreaterThan(0);
  })

  it('/company create company and get 401', async () => {
    const response = await request(app.getHttpServer())
      .post('/company')
      .send({ name: 'Company1', vatNO: 123456754 })
      .expect(401);
  })

  it('/company/1 update company', async () => {
    const response = await request(app.getHttpServer())
      .put('/company/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Company1', vatNO: 123456789, deleted: false })
      .expect(200)

    expect(response.body.id).toBe(1);
  })

  it('/company/200 update company', async () => {
    const response = await request(app.getHttpServer())
      .put('/company/200')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Company1', vatNO: 123456789, deleted: false })
      .expect(404)
  })

  it('/company/1 delete company', async () => {
    const response = await request(app.getHttpServer())
      .delete('/company/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
      .expect(200)
  })

  it('/job create job', async () => {
    const response = await request(app.getHttpServer())
      .post('/job')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Job1', description: 'Job1Description', company_id: 1 })
      .expect(201)

    expect(response.body.id).toBeGreaterThan(0);
  })

  it('/job/1 update job', async () => {
    const response = await request(app.getHttpServer())
      .put('/job/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Job1', description: '12345678999234', company_id: 1, deleted: false })
      .expect(200)

    expect(response.body.id).toBe(1);
  })

  it('/job/1 delete job', async () => {
    const response = await request(app.getHttpServer())
      .delete('/job/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
      .expect(200)
  })

  it('/job/100 delete job', async () => {
    const response = await request(app.getHttpServer())
      .delete('/job/100')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
      .expect(404)
  })

  it('/job/1 delete job', async () => {
    const response = await request(app.getHttpServer())
      .delete('/job/1')
      .send()
      .expect(401)
  })
});

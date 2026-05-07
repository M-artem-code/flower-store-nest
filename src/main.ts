import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Flowers API')
    .setDescription('The Flowers API description')
    .setVersion('1.0')
    .addTag('flowers')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Application running on http://localhost:${port}/api`);

  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });

  await microserviceApp.listen();
  console.log('Microservice is running on: http://localhost:3001');
}
bootstrap();

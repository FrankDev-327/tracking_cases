import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tracking cases api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.enableCors({
    origin: ['http://localhost:9090', 'https://amritb.github.io'],
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running...' + process.env.SERVER_PORT);
  });
}
bootstrap();

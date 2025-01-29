import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Tic-Tac-Toe')
    .setDescription('API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'api',
    app,
    document,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

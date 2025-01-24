import { AccessExceptionFilter } from '@filters/access-exception.filter';
import { AllExceptionsFilter } from '@filters/all-exception.filter';
import { BadRequestExceptionFilter } from '@filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from '@filters/not-found-exception.filter';
import { ThrottlerExceptionsFilter } from '@filters/throttler-exception.filter';
import validationExceptionFactory from '@filters/validation-exception-factory';
import { ValidationExceptionFilter } from '@filters/validation-exception.filter';
import { AppModule } from '@modules/app/app.module';
import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '@providers/prisma/prisma-client-exception.filter';
import { useContainer } from 'class-validator';
import basicAuth from 'express-basic-auth';
async function bootstrap(): Promise<{ port: number }> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService: ConfigService<any, boolean> = app.get(ConfigService);
  const appConfig = configService.get('app');
  const swaggerConfig = configService.get('swagger');
  app.setGlobalPrefix('api');

  {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        users: {
          [swaggerConfig.user]: swaggerConfig.password,
        },
      }),
    );
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle('Prueba Técnica')
      .setDescription('Prueba Técnica Api REST')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        // If set to true, it persists authorization data,
        // and it would not be lost on browser close/refresh
        persistAuthorization: true,
      },
    });
  }

  {
    /**
     * ValidationPipe options
     * https://docs.nestjs.com/pipes#validation-pipe
     */
    const options = {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    };

    app.useGlobalPipes(
      new ValidationPipe({
        ...options,
        exceptionFactory: validationExceptionFactory,
      }),
    );
  }

  {
    /**
     * Enable global filters
     * https://docs.nestjs.com/exception-filters
     */
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(
      new AllExceptionsFilter(),
      new AccessExceptionFilter(httpAdapter),
      new NotFoundExceptionFilter(),
      new BadRequestExceptionFilter(),
      new PrismaClientExceptionFilter(httpAdapter),
      new ValidationExceptionFilter(),
      new ThrottlerExceptionsFilter(),
    );
  }
  await app.listen(appConfig.port);
  return appConfig;
}
bootstrap().then((appConfig) => {
  Logger.log(`Running in http://localhost:${appConfig.port}`, 'Bootstrap');
});

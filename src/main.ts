import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(session({
    secret: 'daodaposu',
    resave: false,
    // everytime we modify session it will generate new session with this 
    // set to false
    // if true, it will modified on each request
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}

bootstrap();

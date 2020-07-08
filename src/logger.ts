import path from 'path';
import { Context, Next, Middleware } from 'koa';
import { isDev } from './config';
import winston, { transports, format } from 'winston';

const logger = (winstonInstance: typeof winston): Middleware => {
  winstonInstance.configure({
    level: isDev ? 'debug' : 'info',
    transports: [
      new transports.File({ filename: path.join(__dirname, '..', 'log', 'error.log'), level: 'error' }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });

  return async (ctx: Context, next: Next): Promise<void> => {
    const start = new Date().getTime();

    await next();

    const ms = new Date().getTime() - start;

    let logLevel = 'info';

    if (ctx.status >= 500) {
      logLevel = 'error';
    }

    if (ctx.status >= 400) {
      logLevel = 'warn';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winstonInstance.log(logLevel, msg);
  };
};

export { logger };

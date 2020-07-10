import 'reflect-metadata';
import Koa from 'koa';
import jwt from 'koa-jwt';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import winston from 'winston';
import connect from './connect';
import { Photo } from './entity/photo';

import { logger } from './logger';
import { jwtSecret, port } from './config';

// 数据库连接
connect().then((connection) => {
  // 这里可以写实体操作相关的代码
  const photo = new Photo();
  return connection.manager.save(photo).then((photo) => {
    console.log('Photo has been saved. Photo id is', photo.id);
  });
});

const app = new Koa();

// 添加安全相关头，如内容安全策略
app.use(helmet());

// 开启同源策略支持
app.use(cors());

// 开启 body 解析
app.use(bodyParser());

// 开启日志
app.use(logger(winston));

// ------------------------------------------------ JWT 鉴权
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = '抱歉，您没有权限访问该资源！';
    } else {
      throw err;
    }
  });
});

app.use(jwt({ secret: jwtSecret }));

app.use(function (ctx) {
  if (ctx.url.match(/^\/api/)) {
    ctx.body = 'protected\n';
  }
});
// ------------------------------------------------ JWT 鉴权

app.listen(port);

console.log(`Server running on port ${port}`);

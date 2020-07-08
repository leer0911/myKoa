import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  ctx.body = 'Hello world';
});

app.listen(3000, () => {
  console.log('Listen on 3000');
});

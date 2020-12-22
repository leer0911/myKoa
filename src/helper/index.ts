import { Context } from 'koa';

export function success(context: Context, data = null, msg = '请求成功'): void {
  context.status = 200;
  context.body = {
    code: 200,
    data,
    msg,
  };
}

import { Context } from 'koa';
import { getManager } from 'typeorm';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../entity';
import { jwtSecret } from '../config';
import { success } from '../helper';

export async function register(context: Context): Promise<void> {
  const { username, password } = context.request.body;
  const userRepository = getManager().getRepository(User);
  await userRepository.save({ username, password });
  success(context);
}

export async function login(context: Context): Promise<void> {
  const { username, password } = context.request.body;
  const userRepository = getManager().getRepository(User);
  const findUser = await userRepository.findOne({ where: { username } });
  if (findUser.password === password) {
    const token = jsonwebtoken.sign({ username, password }, jwtSecret, { expiresIn: '4h' });
    context.cookies.set('auth', token, { overwrite: true, maxAge: 60000 * 60 });
    success(context, { current: findUser, token });
  }
  if (findUser.password !== password) {
    context.body = { message: '密码错误' };
  }
}

export async function fetchUser(context: Context): Promise<void> {
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.find();
  success(context, user);
}

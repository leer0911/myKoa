import { register, login, fetchUser } from './controller/';

export const AppRoutes = [
  {
    path: '/api/users',
    method: 'get',
    action: fetchUser,
  },
  {
    path: '/api/login',
    method: 'post',
    action: login,
  },
  {
    path: '/api/register',
    method: 'post',
    action: register,
  },
];

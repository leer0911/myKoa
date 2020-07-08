const jwtSecret = process.env.JWT_SECRET || 'shared-secret';
const port = +(process.env.PORT || 3000);
const isDev = process.env.NODE_ENV == 'development';

export { jwtSecret, port, isDev };

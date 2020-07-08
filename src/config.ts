const jwtSecret = process.env.JWT_SECRET || 'shared-secret';
const port = +(process.env.PORT || 3000);

export { jwtSecret, port };

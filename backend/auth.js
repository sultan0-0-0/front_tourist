import { verify } from 'jsonwebtoken';
import { database } from './db/db.js';
import { TOP_AUTH_SECRET } from './utils.js';

export default async (request, response, next) => {
  try {
    const token = await request.cookies.access_tourist_token;
    const decodedToken = await verify(token, TOP_AUTH_SECRET);
    const user = await decodedToken;
    const savedUser = await database
      .collection('users')
      .findOne({ login: user.userLogin });
    if(savedUser.session === user.session) {
      request.user = user;
      next();
    }
    else {
      response.redirect(401, '/login');
    }
  } catch (error) {
    response.redirect(401, '/login');
  }
};

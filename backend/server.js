import express, { urlencoded } from 'express';
import bp_pkg from 'body-parser';
import { hash, compare } from 'bcrypt';
import jwt_pkg from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { v4 as uuid } from 'uuid';

const { json } = bp_pkg;
const { sign } = jwt_pkg

import auth from './auth.js';
import { database } from './db/db.js';
import { TOP_AUTH_SECRET, EMAIL_REGEXP } from './utils.js';


const app = express();

const port = process.env.PORT || 5000;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

// handlers:

app.post('/api/register', (request, response) => {
  if(
      (typeof request.body.password === 'string') && (request.body.password.length > 0) &&
      (typeof request.body.login === 'string') && (request.body.login.length > 0) &&
      (typeof request.body.email === 'string') && (request.body.email.toLowerCase().match(EMAIL_REGEXP))
    ) {
    hash(request.body.password, 10)
      .then(hashedPassword => {
        const user = {
          login: request.body.login,
          email: request.body.email,
          password: hashedPassword,
        };

        database
          .collection('users')
          .insertOne(user)
          .then(() => {
            response.redirect(303, '/login');
          })
          .catch(db_save_error => {
            response.status(500).send({
              message: 'В ходе регистрации произошла ошибка',
              error: db_save_error,
            });
          });
      })
      .catch(hash_error => {
        response.status(500).send({
          message: 'Не удалось захэшировать пароль',
          hash_error,
        });
      });
  }
  else {
    response.status(400).send({
      message: 'Некорректный ввод',
    });
  }
});

app.post('/api/login', (request, response) => {
  if(
      (typeof request.body.password === 'string') && (request.body.password.length > 0) &&
      (typeof request.body.login === 'string') && (request.body.login.length > 0)
    ) {
    database
      .collection('users')
      .findOne({ login: request.body.login })
      .then(user => {
        compare(request.body.password, user.password)
          .then(passwordCheck => {
            if (!passwordCheck) {
              return response.status(400).send({
                message: 'Неверный пароль',
              });
            }
            const sessionId = uuid();
            const token = sign(
              {
                userId: user._id,
                userLogin: user.login,
                userEmail: user.email,
                session: sessionId,
              },
              TOP_AUTH_SECRET,
              { expiresIn: '24h' },
            );
            database
              .collection('users')
              .updateOne({ login: user.login }, { $set: { session: sessionId } })
              .then(() => {
                response
                  .cookie('access_tourist_token', token)
                  .redirect(303, '/blog');
              })
              .catch(() => {
                response.status(500).send({
                  message: 'Ошибка при регистрации сессии в базе',
                });
              });
          })
          .catch((err) => {
            response.status(400).send({
              message: `Проблема с паролем ${err}`,
            });
          });
      })
      .catch(() => {
        response.status(404).send({
          message: 'Указанного адреса электронной почты в базе не представлено',
        });
      });
  }
  else {
    response.status(400).send({
      message: 'Некорректный ввод',
    });
  }
});

app.post('/api/logout', auth, (req, res) => {
  if(
      (typeof req.user.userLogin === 'string') && (req.user.userLogin.length > 0)
    ) {
    database
      .collection('users')
      .updateOne({ login: req.user.userLogin }, { $set: { session: uuid() } })
      .then(() => {
        res.redirect(303, '/login');
      })
      .catch(() => {
        res.status(404).send({
          message: 'Выйти не удалось',
        });
      });
  }
  else {
    res.status(400).send({
      message: 'Некорректный ввод',
    });
  }
});

app.get('/api/get_posts', auth, async (req, res) => {
  if(!isNaN(parseInt(req.query.page)) && !isNaN(parseInt(req.query.perPage))) {
    const page = Number(req.query.page);
    const perPage = Number(req.query.perPage);
    const posts = await database
      .collection('posts')
      .find()
      .sort({timestamp: -1})
      .skip(page * perPage)
      .limit(perPage)
      .toArray();
    res.send(posts);
  }
  else {
    res.status(400).send({
      message: 'Некорректный ввод',
    });
  }
});

app.post('/api/add_post', auth, async (req, res) => {
  let addedPost = req.body;
  addedPost.author = req.user.userLogin;
  addedPost.timestamp = new Date();
  addedPost.picture = '';
  await database.collection('posts').insertOne(addedPost);
  res.redirect(303, '/blog');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

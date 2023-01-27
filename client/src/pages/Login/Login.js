import React from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.css';

function Login() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <header>Login</header>
        <form method="post" action="/api/login">
          <div className={style.field}>
            <input type="text" placeholder="ИмяПользователя" name="login" />
          </div>
          <div className={style.field}>
            <span />
            <input type="password" placeholder="100500" name="password" />
          </div>
          <div className={style.field}>
            <input type="submit" value="Login" />
          </div>
          <div className={style.register}>Ещё нет учётной записи?</div>
          <span>
            <Link className={style.button} to="/register">
              Заведите!
            </Link>
          </span>
          <span>
            <Link className={style.button} to="/">
              Назад
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
export default Login;

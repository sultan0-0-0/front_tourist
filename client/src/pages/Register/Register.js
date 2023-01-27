import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Login/Login.module.css';

function Register() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <header>Register</header>
        <form method="post" action="/api/register">
          <div className={style.field}>
            <span />
            <input type="text" placeholder="Админ" name="login" />
          </div>
          <div className={style.field}>
            <span />
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className={style.field}>
            <span />
            <input type="password" placeholder="1234" name="password" />
          </div>
          <div className={style.field}>
            <span />
            <input
              className={style.register}
              type="submit"
              value="Register"
            />
          </div>
          <div className={style.login}>Уже зарегистрированы?</div>
          <span>
            <Link className={style.button} to="/login">
              Войти сейчас
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;

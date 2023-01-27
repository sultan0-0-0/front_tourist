import React from 'react';
import style from './Blog.module.css';

function NewPost() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <header>Новый пост</header>
        <form method="post" action="/api/add_post">
          <div className={style.field}>
            <input type="text" placeholder="Кругосветка" name="title" />
          </div>
          <div className={style.field}>
            <input
              type="text"
              placeholder="Лучшая поездка в мире"
              name="content"
            />
          </div>
          <div>
            <input type="submit" value="Поделиться" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewPost;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Search.module.css';

function Search() {
  const [img, setImg] = useState('');
  const [res, setRes] = useState([]);

  const fetchRequest = async () => {
    await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_SECRET_KEY}&per_page=20`,
    )
      .then(async (answer) => {
        if (answer.status === 401) {
          setRes([]);
          return;
        }
        const data = await answer.json();
        const result = data.results;
        setRes(result);
      })
      .catch(() => {
        setRes([]);
      });
  };

  function submit() {
    const text = document.getElementById('inp');
    setImg(text.value);
    fetchRequest();
  }

  return (
    <div className={style.content}>
      <input id="inp" className="" type="text" placeholder="Поиск" />
      <button type="submit" onClick={() => submit()} className={style.button}>
        Найти
      </button>
      <div className="col-12 d-flex justify-content-evenly flex-wrap">
        {res.map((val) => (
          <img
            className="col-3 img-fluid img-thumbnail"
            src={val.urls.small}
            alt="val.alt_description"
          />
        ))}
      </div>
    </div>
  );
}

export default Search;

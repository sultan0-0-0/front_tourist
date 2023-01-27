import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Spinner,
} from 'reactstrap';
import ReactGA from 'react-ga';
import style from './Blog.module.css';

function Blog() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const controller = new AbortController();
  const eventTrack = (category, action, label) => {
    ReactGA.event({ category, action, label });
  };

  async function uploadPosts(uploadedPage, perPageN) {
    const newPosts = await fetch(
      '/api/get_posts?'
      + new URLSearchParams({
        page: uploadedPage,
        perPage: perPageN,
      }),
      {
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (response.status === 401) {
          setError(401);
          return [];
        }
        setError(null);
        return response.json();
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        throw err;
      });
    return newPosts;
  }

  function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  function checkPosition(posts) {
    return async () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 9;
      const position = scrolled + screenHeight;

      if (position >= threshold) {
        const oldPage = window.page;
        const newPosts = await uploadPosts(oldPage, 10);
        if (newPosts.length > 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const addedPost of newPosts) {
            posts.push(addedPost);
          }
          const expandedPosts = posts.slice();
          setPosts(expandedPosts);
          window.page += 1;
        }
      }
    };
  }

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      window.page = 0;
      const newPosts = await uploadPosts(window.page, 10);
      setPosts(newPosts || []);
      setLoading(false);

      window.addEventListener('scroll', throttle(checkPosition(newPosts), 100));
      window.addEventListener('resize', throttle(checkPosition(newPosts), 100));
    };
    getPosts();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center">
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <Row>
          {error ? (
            <p>Авторизуйтесь</p>
          ) : (
            <>
              <div className={style.rectangle} />
              <form method="post" action="/api/logout/">
                <div>
                  <input
                    type="submit"
                    value="Выйти"
                    onClick={eventTrack.bind('Blog screen', 'Sign Out button', 'Button')}
                  />
                </div>
              </form>
              <Link className={style.button} to="/new_post">
                Новый пост
              </Link>
              {!posts.length ? (
                <p>Пока тут пусто...</p>
              ) : (
                posts.map((post) => (
                  <Card key={post._id}>
                    <CardBody>
                      <CardTitle tag="h1">{post.title}</CardTitle>
                      <CardText>{post.content}</CardText>
                      <CardText>
                        <i>
                          Написал
                          {' '}
                          {post.author}
                          ,
                          {' '}
                          {post.timestamp}
                        </i>
                      </CardText>
                      <hr />
                    </CardBody>
                  </Card>
                ))
              )}
            </>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Blog;

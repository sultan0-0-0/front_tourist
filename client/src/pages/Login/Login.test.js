import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('login', () => {
  it('fields input should work', async () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const emailField = screen.getByPlaceholderText('ИмяПользователя');

    await userEvent.type(emailField, 'max@mail.ru');
    expect(emailField).toHaveValue('max@mail.ru');
  });

  it('login button should work', async () => {
    const { container } = render(
      <Router>
        <Login />
      </Router>,
    );

    const loginButton = container.querySelector('.button');
    expect(loginButton).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';

describe('register', () => {
  it('fields input should work', async () => {
    render(
      <Router>
        <Register />
      </Router>,
    );
    const emailField = screen.getByPlaceholderText('Email');

    await userEvent.type(emailField, 'email@');
    expect(emailField).toHaveValue('email@');
  });

  it('register button should be rendered', async () => {
    const { container } = render(
      <Router>
        <Register />
      </Router>,
    );

    const registerButton = container.querySelector('.register');
    expect(registerButton).toBeInTheDocument();
  });
});

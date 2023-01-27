import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  test('User can navigate to register screen', async () => {
    render(
      <Router>
        <Home />
      </Router>,
    );

    const registerLink = screen.getByRole('link', { name: 'Register Now' });

    expect(registerLink.href).toContain('/register');
  });
});

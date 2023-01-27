import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

describe('contact', () => {
  it('should have working input fields', async () => {
    render(
      <Router>
        <Contact />
      </Router>,
    );
    const yourNameField = screen.getByPlaceholderText('Your Name');
    const emailField = screen.getByPlaceholderText('Email Id');
    const phoneNumberField = screen.getByPlaceholderText('Phone Number');
    const textField = screen.getByPlaceholderText('How can we Help you?');

    await userEvent.type(yourNameField, 'name');
    expect(yourNameField).toHaveValue('name');

    await userEvent.type(emailField, 'email@');
    expect(emailField).toHaveValue('email@');

    await userEvent.type(phoneNumberField, '+7991323764');
    expect(phoneNumberField).toHaveValue('+7991323764');

    await userEvent.type(textField, 'very good site');
    expect(textField).toHaveValue('very good site');
  });

  it('register button should be rendered', async () => {
    const { container } = render(
      <Router>
        <Contact />
      </Router>,
    );

    const sendButton = container.querySelector('.send');
    expect(sendButton).toBeInTheDocument();
  });
});

import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import style from './Contact.module.css';
import useAnalyticsEventTracker from '../../components/GoogleEventTracker';

function GetInTouch() {
  const gaEventTracker = useAnalyticsEventTracker('Contact us');
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_USER_ID,
    );
    e.target.reset();
  };
  return (
    <div className={style.container}>
      <div className={style.content}>
        <header>Get in Touch</header>
        <form ref={form} onSubmit={sendEmail}>
          <div className={style.field}>
            <span />
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className={style.field}>
            <span />
            <input type="email" id="email" placeholder="Email Id" required />
          </div>
          <div className={style.field}>
            <span />
            <input type="text" id="phone" placeholder="Phone Number" required />
          </div>
          <div className={style.field}>
            <textarea
              id="message"
              cols="20"
              rows="1"
              placeholder="How can we Help you?"
            />
          </div>
          <input className={style.send} type="submit" value="Send" onClick={() => gaEventTracker('call')} />
        </form>
      </div>
    </div>
  );
}
export default GetInTouch;

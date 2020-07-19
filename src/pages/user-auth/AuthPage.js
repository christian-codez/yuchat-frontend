import React, { useEffect } from 'react';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/register/RegisterForm';
import M from 'materialize-css';
import './auth-page.style.css';
const AuthPage = () => {
  useEffect(() => {
    const el = document.getElementById('tabs');
    M.Tabs.init(el, {
      swipeable: false,
    });
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <ul className='tabs tabs-fixed-width' id='tabs'>
          <li className='tab col s3'>
            <a href='#login'>Login</a>
          </li>
          <li className='tab col s3'>
            <a href='#register'>Register</a>
          </li>
        </ul>
      </div>
      <div className='row'>
        <div id='login' className='col s12  m8 offset-m2'>
          <h3 className='center'>Login</h3>
          <hr />
          <LoginForm />
        </div>
        <div id='register' className='col s12 m8 offset-m2'>
          <h3 className='center'>Register</h3>
          <hr />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

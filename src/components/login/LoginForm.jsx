import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './login-form.style.css';
import CustomButton from '../../shared/custom-button/CustomButton';
import Icon from '../../shared/icon/Icon';
import {
  loginAction,
  resetLoginErrorAction,
} from '../../redux/actions/auth.actions';
import { useHistory } from 'react-router-dom';

const LoginForm = ({
  signinError,
  loginAction,
  resetLoginErrorAction,
  currentUser,
}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  let history = useHistory();

  useEffect(() => {
    resetLoginErrorAction();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    loginAction(inputs);
    history.push('/');
  };

  const handleInputChange = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  if (currentUser) {
    history.push('/');
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <input
            placeholder='Enter your email'
            id='email'
            onChange={handleInputChange}
            type='email'
            value={inputs.email}
            className='validate email'
          />
        </div>

        <div className='input-field'>
          <input
            placeholder='Enter your password'
            id='password'
            onChange={handleInputChange}
            type='password'
            value={inputs.password}
            className='validate password'
          />
        </div>

        <CustomButton
          className='waves-effect red darken-4'
          type='submit'
          name='login'>
          Login <Icon icon='send' color='#fff' />
        </CustomButton>

        {signinError && <p className='auth-error-message'>{signinError}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    signinError: state.auth.signinError,
  };
};

export default connect(mapStateToProps, { loginAction, resetLoginErrorAction })(
  LoginForm
);

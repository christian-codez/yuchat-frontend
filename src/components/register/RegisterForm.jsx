import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../shared/custom-button/CustomButton';
import Icon from '../../shared/icon/Icon';
import {
  registerAction,
  resetErrorAction,
} from '../../redux/actions/auth.actions';
import { useHistory } from 'react-router-dom';
import './register-form.style.css';

const RegisterForm = ({ signupError, resetErrorAction, registerAction }) => {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    resetErrorAction();
  }, []);

  let history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await registerAction(inputs);
    if (response) {
      history.push('/');
    }
  };

  const handleInputChange = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <input
            placeholder='Enter your firstname'
            id='firstname'
            onChange={handleInputChange}
            type='text'
            value={inputs.firstname}
            className='validate firstname'
          />
          <label htmlFor='firstname'></label>
        </div>{' '}
        <div className='input-field'>
          <input
            placeholder='Enter your lastname'
            id='lastname'
            onChange={handleInputChange}
            type='text'
            value={inputs.lastname}
            className='validate lastname'
          />
          <label htmlFor='lastname'></label>
        </div>
        <div className='input-field'>
          <input
            placeholder='Enter your email'
            id='email'
            onChange={handleInputChange}
            type='email'
            value={inputs.email}
            className='validate email'
          />
          <label htmlFor='email'></label>
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
          <label htmlFor='password'></label>
        </div>
        <CustomButton
          className='waves-effect red darken-4'
          type='submit'
          name='login'>
          Register Account <Icon icon='create' color='#fff' />
        </CustomButton>
        {signupError && <p className='auth-error-message'>{signupError}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    signupError: state.auth.signupError,
  };
};
export default connect(mapStateToProps, { registerAction, resetErrorAction })(
  RegisterForm
);

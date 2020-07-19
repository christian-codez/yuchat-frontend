import React, { useState, useEffect } from 'react';
import Input from '../../../shared/form-inputs/input/Input';
import Button from '../../../shared/form-inputs/button/Button';
import Icon from '../../../shared/icon/Icon';
import { connect } from 'react-redux';
import { updateUserInfoAction } from '../../../redux/actions/user.actions';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const UpdateForm = ({
  currentUser,
  updatingUserInfo,
  updateUserInfoAction,
}) => {
  const [input, setInput] = useState({
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    userbio: null,
  });

  useEffect(() => {
    if (currentUser) {
      setInput({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        phone: currentUser.phone,
        userbio: currentUser.userbio,
      });
    }
  }, [currentUser]);

  const handleInputChange = event => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    updateUserInfoAction(input);
  };

  return (
    <form className='col s12' onSubmit={handleFormSubmit}>
      <div className='row'>
        <div className='col s12 m6'>
          <Input
            type='text'
            id='firstname'
            label='First Name'
            value={input.firstname}
            inputCallback={handleInputChange}
          />
        </div>{' '}
        <div className='col s12 m6'>
          <Input
            type='text'
            id='lastname'
            label='Last Name'
            value={input.lastname}
            inputCallback={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12 m6'>
          <Input
            type='email'
            id='email'
            label='Email'
            value={input.email}
            inputCallback={handleInputChange}
          />
        </div>{' '}
        <div className='col s12 m6'>
          <Input
            type='tel'
            id='phone'
            label='Phone Number'
            inputCallback={handleInputChange}
            value={input.phone}
          />
        </div>
      </div>
      <div className='input-field col s12'>
        <Input
          type='textarea'
          id='userbio'
          className=''
          label='User Bio'
          value={input.userbio}
          inputCallback={handleInputChange}
        />
      </div>
      <Button
        size='large'
        type='submit'
        color='btn-danger'
        visibility={updatingUserInfo}>
        Update info
        <Icon className='left' icon='create' color='neutral' size='27px' />
      </Button>
      <RequestLoading type='circle' show={updatingUserInfo} />
    </form>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    updatingUserInfo: state.api.updatingUserInfo,
  };
};

export default connect(mapStateToProps, { updateUserInfoAction })(UpdateForm);

import React from 'react';
import './welcome-screen.style.css';
import { connect } from 'react-redux';
import StaticImage from '../../images/static-logo.png';
import Button from '../form-inputs/button/Button';
import Icon from '../icon/Icon';
import { useHistory } from 'react-router-dom';

const WelcomeScreen = ({ currentUser, friends, last_messages }) => {
  let history = useHistory();
  const welcomeButtonAction = () => {
    if (friends.length > 0) {
      history.push('/friends');
    } else {
      history.push('/people');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        height: '80vh',
        width: '90%',
        margin: '0 auto',
      }}>
      <h1 className='welcome-heading'>Hi {currentUser.firstname}</h1>
      <p className='welcome-sub-heading'>
        Welcome to u-chat. Our goal is to help you to connect with your friends
        and loved ones.
      </p>
      <div
        className='welcome-image'
        style={{
          backgroundImage: `url(${StaticImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          padding: '0',
          height: '45vh',
          backgroundColor: '#fff',
        }}></div>
      <div className='welcome-action-button'>
        {' '}
        <Button
          type='button'
          name='unfriend-btn'
          color='btn-danger'
          buttonCallback={welcomeButtonAction}>
          {friends.length > 0 ? 'See My Friends' : 'Add Friends'}
          <Icon className='right' icon='person' color='neutral' size='21px' />
        </Button>
      </div>
    </div>
  );
};

const staticBgImage = {
  backgroundImage: `url(${StaticImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  padding: '0',
  minHeight: '80vh',
  backgroundColor: '#fff',
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    last_messages: state.chat.last_messages,
    friends: state.app.friends,
  };
};
export default connect(mapStateToProps, {})(WelcomeScreen);

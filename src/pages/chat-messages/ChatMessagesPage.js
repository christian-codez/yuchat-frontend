import React, { useContext, Fragment, useEffect } from 'react';
import SearchField from '../../shared/search-field/SearchField';
import BackgroundImage from '../../images/chat-wallpaper.jpg';
import StaticImage from '../../images/static-logo.png';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatHeader from '../../components/chats/chat-header/ChatHeader';
import ChatMessages from '../../components/chats/chat-messages/ChatMessages';
import UserListings from '../../components/chats/user-listings/UserListings';
import SendMessageBox from '../../components/chats/send-mesage-box/SendMessageBox';
import Modal from '../../shared/modal/Modal';
import M from 'materialize-css';
import './chat-messages.style.css';
import Button from '../../shared/form-inputs/button/Button';
import Icon from '../../shared/icon/Icon';
import WelcomeScreen from '../../shared/welcome-screen/WelcomeScreen';

const ChatMessagesPage = ({
  last_messages,
  friends,
  chattingWith,
  currentUser,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser]);

  useEffect(() => {
    if (window.innerWidth <= 760 && chattingWith) {
      mobileUserClicked();
    }
  }, []);

  const modalClose = () => {
    var elems = document.getElementById('chat-messages');
    let modal = M.Modal.init(elems);
    modal.close();
  };

  const mobileUserClicked = () => {
    const elem = document.querySelector('#chat-messages');
    const instance = M.Modal.init(elem, { dismissible: false });

    if (instance) {
      instance.open();
    }
  };

  {
    return currentUser ? (
      <div className='chat-page'>
        <div className='last-message-listings'>
          <UserListings />
        </div>

        <div
          className='chat-panels'
          style={chattingWith ? defaultBgImage : staticBgImage}>
          {chattingWith && (
            <Fragment>
              <ChatHeader />
              <ChatMessages />
              <SendMessageBox />
            </Fragment>
          )}
        </div>

        <Modal
          modalClose={modalClose}
          bgImage={chattingWith ? defaultBgImage : staticBgImage}
          id='chat-messages'
          className='modal-fixed-footer  bottom-sheet chat-modal'
          footer={<SendMessageBox />}
          header={<ChatHeader />}>
          <Fragment>
            <ChatMessages />
          </Fragment>
        </Modal>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  }
};

const defaultBgImage = {
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  minHeight: '14vh',
  backgroundSize: 'cover',
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

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    currentUser: state.auth.currentUser,
    friends: state.app.friends,
    last_messages: state.chat.last_messages,
  };
};

export default connect(mapStateToProps, null)(ChatMessagesPage);

import React, { useState, useRef, useEffect } from 'react';
import './send-message-box.style.css';
import { connect } from 'react-redux';
import {
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
  clearMessageRequestStatus,
} from '../../../redux/actions/chat.actions';

const SendMessageBox = ({
  chattingWith,
  RequestStatus,
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
  clearMessageRequestStatus,
  currentUser,
}) => {
  const [input, setInput] = useState({
    message: '',
    attachments: null,
  });

  const messageBoxRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      clearMessageRequestStatus();
    }, 3000);
  }, [RequestStatus]);

  const handleInputChange = event => {
    if (event.keyCode !== 13) {
      setInput({ ...input, [event.target.id]: event.target.value });
    }
  };

  const sendMessage = async () => {
    if (input.message || input.attachments) {
      sendChatMessageAction({
        message: input.message,
        receiverID: chattingWith.id,
        senderID: currentUser.id,
        attachments: input.attachments,
      });
    } else {
      alert('enter a message');
    }
    setInput({ message: '', attachments: null });
    messageBoxRef.current.value = '';
  };

  const handleMessageSubmit = event => {
    event.preventDefault();
    sendMessage();
  };

  const notifyTypingStarted = () => {
    notifyTypingStartedAction(chattingWith.id);
  };
  const notifyTypingStopped = () => {
    notifyTypingStoppedAction(chattingWith.id);
  };

  const sendMessageOnEnter = event => {
    if (event.keyCode == 13) {
      sendMessage();
    }
  };

  return (
    <div className='submit-text-box'>
      <div
        className=' message-box'
        style={{
          margin: '0',
          backgroundColor: ' #fff',
          zIndex: '1000',
          height: '70px',
        }}>
        <textarea
          onFocus={notifyTypingStarted}
          onBlur={notifyTypingStopped}
          ref={messageBoxRef}
          onChange={handleInputChange}
          onKeyUp={sendMessageOnEnter}
          id='message'
          defaultValue={input.message}
          placeholder='Enter your message...'
          className='message-textbox scroll'></textarea>
        {input.message.length > 0 && (
          <div className='send-btn' onClick={handleMessageSubmit}>
            SEND
          </div>
        )}
      </div>
      {/* <p className='message-status'>{RequestStatus}</p> */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chattingWith: state.chat.chattingWith,
    RequestStatus: state.chat.RequestStatus,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  sendChatMessageAction,
  notifyTypingStartedAction,
  notifyTypingStoppedAction,
  clearMessageRequestStatus,
})(SendMessageBox);

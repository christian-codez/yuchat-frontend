import React, { useEffect, useState, useRef, Fragment } from 'react';
import './chat-messages.style.css';
import Message from '../message/Message';
import { connect } from 'react-redux';
import { GetTimeAgo } from '../../../utils/format-time';
import {
  fetchMessagesAction,
  readUnreadMessagesAction,
} from '../../../redux/actions/chat.actions';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const ChatMessages = ({
  chattingWith,
  chatMessages,
  currentUser,
  clearingChatHistory,
  fetchMessagesAction,
  readUnreadMessagesAction,
}) => {
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const chatMessagesRef = useRef(null);

  const updateScroll = () => {
    let element = chatMessagesRef.current;
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    readUnreadMessagesAction(chattingWith);
  }, []);

  useEffect(() => {
    setFetchingMessages(true);
    if (chattingWith) {
      fetchMessagesAction(chattingWith.id, currentUser.id);
      updateScroll();
      setFetchingMessages(false);
    }
  }, [chattingWith]);

  const messageDate = [];
  const displayMessageDate = message => {
    const date = GetTimeAgo(message.created_at);
    if (!messageDate.includes(date)) {
      messageDate.push(date);
      return (
        <div className='message-date'>
          <span className='message-date__text'>{GetTimeAgo(date)}</span>
        </div>
      );
    }
  };

  if (fetchingMessages) {
    return (
      <section
        ref={chatMessagesRef}
        id='messageBody'
        className='chat-messages scroll'>
        <div className='loading-message'>
          <RequestLoading type='circle' show='true' />
          <p className='message-loading-text'>Loading messages...</p>
        </div>
      </section>
    );
  } else if (!fetchingMessages) {
    return (
      <section
        ref={chatMessagesRef}
        id='messageBody'
        className='chat-messages scroll'>
        {clearingChatHistory && (
          <div className='loading-message'>
            <RequestLoading type='circle' show='true' />
            <p className='message-loading-text'>Clearing chat history...</p>
          </div>
        )}
        <div className='chat-messages'>
          {chatMessages &&
            chatMessages.map((message, index) => {
              return (
                <Fragment key={index}>
                  {displayMessageDate(message)}
                  <Message key={message.id} message={message} />
                </Fragment>
              );
            })}
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    chattingWith: state.chat.chattingWith,
    chatMessages: state.chat.sentMessages,
    clearingChatHistory: state.chat.clearingChatHistory,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesAction,
  readUnreadMessagesAction,
})(ChatMessages);

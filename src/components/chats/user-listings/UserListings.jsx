import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ListItem from '../list-item/ListItem';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import { fetchLastMessagesAction } from '../../../redux/actions/chat.actions';
import { UserCollection } from './UserListing.styled';
import './user-listings-style.css';

const UserListings = props => {
  const { last_messages, currentUser, fetchLastMessagesAction } = props;
  useEffect(() => {
    fetchLastMessagesAction();
  }, []);

  const userID = currentUser.id;

  const userCollection = [];

  return (
    <section className='users-collection'>
      <UserCollection className='collection scroll'>
        {last_messages ? (
          last_messages.map(message => {
            if (message.sender && message.receiver) {
              let senderID = message.sender.id;
              let id;

              if (userID === senderID) {
                id = message.receiver.id;
                if (!userCollection.includes(id)) {
                  userCollection.push(id);
                  return <ListItem key={message.id} message={message} />;
                }
              } else if (userID !== senderID) {
                id = message.sender.id;
                if (!userCollection.includes(id)) {
                  userCollection.push(id);
                  return <ListItem key={message.id} message={message} />;
                }
              }
            }
          })
        ) : (
          <RequestLoading type='bar' show={true} />
        )}
      </UserCollection>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    last_messages: state.chat.last_messages,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  fetchLastMessagesAction,
})(UserListings);

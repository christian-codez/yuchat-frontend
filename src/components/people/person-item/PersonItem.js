import React, { useState } from 'react';
import Icon from '../../../shared/icon/Icon';
import { connect } from 'react-redux';
import { sendRequestAction } from '../../../redux/actions/user.actions';
import './person-item.style.css';
import { CHAT_API_URL } from '../../../utils/api-settings';
import { GetTimeAgo } from '../../../utils/format-time';
import Button from '../../../shared/form-inputs/button/Button';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const PersonItem = ({ person, currentUser, sendRequestAction }) => {
  const [showButton, setShowButton] = useState(true);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const sendRequest = event => {
    event.preventDefault();
    setShowButton(false);
    const data = {
      receiver: person.id,
      notification_type: 'friend_request',
    };

    sendRequestAction(data);
    setRequestCompleted(true);
  };

  const getImageURL = srcURL => {
    if (srcURL) {
      return CHAT_API_URL + '/' + srcURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  const RequestButton = () => {
    if (showButton) {
      return (
        <Button
          type='button'
          size='medium'
          name='update_cover_photo'
          color='btn-primary'
          buttonCallback={sendRequest}>
          Send Request
          <Icon
            className='right'
            icon='person_add'
            color='neutral'
            size='20px'
          />
        </Button>
      );
    } else if (!requestCompleted) {
      return (
        <RequestLoading
          show={!requestCompleted}
          style={{ marginRight: '10px' }}
          type='circle'
        />
      );
    } else if (requestCompleted) {
      return <span>Request Sent</span>;
    }
  };

  return (
    <div className='friend-request-record'>
      <div className='friend-request-record__left'>
        <div className='friend-request-record__left-image'>
          <div
            className='circle'
            style={{
              height: '70px',
              width: '70px',
              border: '2px solid rgb(222, 222, 222)',
              backgroundImage: `url(${getImageURL(person.profilePhotoURL)})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: ' no-repeat',
            }}></div>
        </div>
        <div className='friend-request-record__left-user-info'>
          <span className='username'>
            {person.firstname} {person.lastname}
          </span>
          <span className='joined-on'>
            Joined on: {GetTimeAgo(person.created_at)}{' '}
          </span>
          <span className='friends-count'>
            <Icon icon='people' size='20px' color='#000' /> Friends:{' '}
            {person.friends.length}
          </span>
        </div>
      </div>
      <div className='friend-request-record__right'>{RequestButton()}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    friends: state.app.friends,
  };
};

export default connect(mapStateToProps, { sendRequestAction })(PersonItem);

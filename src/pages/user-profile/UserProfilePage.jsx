import React, { Fragment, useEffect } from 'react';
import UserProfileBanner from '../../components/users/user-profile-banner/UserProfileBanner';
import UserProfileHeader from '../../components/users/user-profile-header/UserProfileHeader';
import StatItem from '../../shared/stat-item/StatItem';
import Divider from '../../shared/divider/Divider';
import UpdateForm from '../../components/users/update-form/UpdateForm';
import { connect } from 'react-redux';
import Loading from '../../shared/loading/loading';
import M from 'materialize-css';
import './user-profile-page.style.css';
import Icon from '../../shared/icon/Icon';
import Button from '../../shared/form-inputs/button/Button';
import { deactivateMyAccountAction } from '../../redux/actions/auth.actions';
import { useHistory } from 'react-router-dom';

const UserProfilePage = ({
  currentUser,
  friends,
  friend_requests,
  unreadMessages,
  deactivateMyAccountAction,
}) => {
  useEffect(() => {
    const el = document.getElementById('settings-tab');
    M.Tabs.init(el);
  }, []);
  let history = useHistory();

  const deactivate_account = () => {
    const response = window.confirm(
      'This action will permanently remove your account. It cannot be undone'
    );

    if (response) {
      const status = deactivateMyAccountAction();
      if (status) {
        history.push('/');
      }
    }
  };

  if (currentUser) {
    return (
      <Fragment>
        <div className='row'>
          <div className='col s12 p-0'>
            <UserProfileBanner />
          </div>
          <div className='col s12 p-0'>
            <UserProfileHeader />
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m12 l4 mb-2'>
            <div className='stat-collections'>
              <StatItem
                count={friends ? friends.length : 0}
                icon='people'
                color='warning'
                title='Friends'
              />
              <StatItem
                count={friend_requests ? friend_requests.length : 0}
                icon='person_add'
                color='primary'
                title='Friend Requests'
              />
              <StatItem
                icon='question_answer'
                color='danger'
                count={unreadMessages ? unreadMessages.length : 0}
                title='Unread Messages'
              />
            </div>
            <br />
            <Button
              type='button'
              name='deactivate-account-btn'
              color='btn-danger'
              buttonCallback={deactivate_account}>
              DEACTIVATE ACCOUNT
              <Icon
                className='right'
                icon='block'
                color='neutral'
                size='21px'
              />
            </Button>
          </div>
          <div className='col s12 m12 l8 mb-2'>
            <ul className='tabs' id='settings-tab'>
              <li className='tab col s3'>
                <a href='#account'>Account</a>
              </li>{' '}
            </ul>
            <div id='account'>
              <div className='user-update-form'>
                <h3 className='sub-heading'>Update User Info</h3>
                <Divider color='danger' size='large' />
                <div className='row'>
                  <UpdateForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    friends: state.app.friends,
    friend_requests: state.app.friend_requests,
    unreadMessages: state.chat.unreadMessages,
  };
};
export default connect(mapStateToProps, { deactivateMyAccountAction })(
  UserProfilePage
);

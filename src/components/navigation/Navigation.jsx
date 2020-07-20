import React, { useEffect, Fragment } from 'react';
import './navigation.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Icon from '../../shared/icon/Icon';
import { connect } from 'react-redux';
import { getMyFriendsAction } from '../../redux/actions/user.actions';
import M from 'materialize-css';
import { logoutAction } from '../../redux/actions/auth.actions';
import RoundImage from '../../shared/round-image/RoundImage';
import DefaultCoverImage from '../../images/default-cover-photo.jpg';
import Badge from '../../shared/badge/Badge';
import { BuildImageURL } from '../../utils/api-settings';
import Logo from '../../images/u-chat-logo.png';
const Navigation = ({
  currentUser,
  unreadMessages,
  logoutAction,
  getMyFriendsAction,
  friends,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (currentUser) {
      getMyFriendsAction();
    }

    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, { edge: 'left' });
  }, [currentUser]);

  const authLogout = () => {
    if (currentUser._id || currentUser.id) {
      const userId = currentUser._id || currentUser.id;
      logoutAction(currentUser.id);
      history.push('/login');
      window.location.reload();
    }
  };

  if (currentUser) {
    return (
      <nav className='friendzspot-navigation'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>
            <img alt={'site-logo'} src={Logo} />
          </Link>
          <a
            href='#'
            data-target='slide-out'
            className='sidenav-trigger right show-on-med-and-down'>
            <i className='material-icons'>menu</i>
          </a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <NavLink to='/messenger'>
                <Icon color='#fff' className='left' icon='question_answer' />{' '}
                Chat{' '}
                <span className='small badge circle-badge blue accent-4'>
                  {unreadMessages && unreadMessages.length}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/friends'>
                <Icon color='#fff' className='left' icon='people' /> Friends
                <span className='small badge circle-badge amber  '>
                  {friends && friends.length}
                </span>
              </NavLink>
            </li>{' '}
            <li>
              <NavLink to='/people'>
                <Icon color='#fff' className='left' icon='public' /> People
              </NavLink>
            </li>{' '}
            {currentUser && (
              <li className='user-account'>
                <NavLink to='/me'>
                  Account ({currentUser.firstname})
                  <Icon color='#fff' className='left' icon='account_circle' />
                </NavLink>
              </li>
            )}
            {currentUser ? (
              <li style={{ cursor: 'pointer' }} onClick={authLogout}>
                Logout
              </li>
            ) : (
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
            )}
          </ul>
          {/* Mobile Navigation */}
          <ul id='slide-out' className='sidenav mobile-side-nav'>
            <li>
              <div className='user-view'>
                <div className='layer-overlay'></div>
                <div
                  className='background'
                  style={{
                    backgroundImage: `url(${
                      currentUser.coverPhotoURL
                        ? BuildImageURL(currentUser.coverPhotoURL)
                        : DefaultCoverImage
                    })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    padding: '0',
                    position: 'relative',
                    minHeight: '320px',

                    backgroundSize: ' cover',
                  }}>
                  <div className='user-profile-photo'>
                    <RoundImage
                      size='150px'
                      url={currentUser.profilePhotoURL}
                    />
                    <a href='#name'>
                      <span className='white-text name'>
                        {currentUser.firstname}
                      </span>
                    </a>
                    <a href='#email'>
                      <span className='white-text email'>
                        {currentUser.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className='mobile-menu-item'>
              <NavLink to='/messenger'>
                <Icon color='#fff' className='left' icon='question_answer' />{' '}
                Messenger{' '}
                <Badge
                  color='primary'
                  count={unreadMessages ? unreadMessages.length : 0}
                />
              </NavLink>
            </li>
            <li className='mobile-menu-item'>
              <NavLink to='/friends'>
                <Icon color='#fff' className='left' icon='people' /> Friends
                <Badge color='danger' count={friends ? friends.length : 0} />
              </NavLink>
            </li>{' '}
            <li className='mobile-menu-item'>
              <NavLink to='/people'>
                <Icon color='#fff' className='left' icon='public' /> People
              </NavLink>
            </li>{' '}
            {currentUser && (
              <li className='mobile-menu-item'>
                <NavLink to='/me'>
                  Account
                  <Icon color='#fff' className='left' icon='account_circle' />
                </NavLink>
              </li>
            )}
            {currentUser ? (
              <li
                className='mobile-menu-item'
                style={{ cursor: 'pointer' }}
                onClick={authLogout}>
                <a>
                  <Icon color='#fff' className='left' icon='all_out' /> Logout
                </a>
              </li>
            ) : (
              <li className='mobile-menu-item'>
                <NavLink to='/login'>Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const defaultCoverImage = {
  backgroundImage: `url(${DefaultCoverImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  padding: '0',
  position: 'relative',
  minHeight: '320px',

  backgroundSize: ' cover',
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    unreadMessages: state.chat.unreadMessages,
    friends: state.app.friends,
  };
};

export default connect(mapStateToProps, { logoutAction, getMyFriendsAction })(
  Navigation
);

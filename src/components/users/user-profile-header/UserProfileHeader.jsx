import React, { Fragment } from 'react';
import './user-profile-header.style.css';
import { connect } from 'react-redux';
const UserProfileHeader = ({ currentUser }) => {
  if (currentUser) {
    return (
      <section className='user-profile'>
        <div className='row'>
          <div className='col s12'>
            <div className='user-profile__header'>
              <h2>
                {currentUser.firstname} {currentUser.lastname}
              </h2>
              <p>{currentUser.userbio}</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(UserProfileHeader);

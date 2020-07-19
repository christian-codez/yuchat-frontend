import React, { Fragment, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import { updateProfilePhotoAction } from '../../../redux/actions/user.actions';
import { CHAT_API_URL } from '../../../utils/api-settings';
import Icon from '../../../shared/icon/Icon';
import './profile-photo.style.css';
const ProfilePhoto = ({
  currentUser,
  profilePhotoUpdating,
  updateProfilePhotoAction,
}) => {
  const [imageFile, setImageFile] = useState('');
  const [imageFileURL, setImageFileURL] = useState('');
  const [tempImageFileURL, setTempImageFileURL] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const UserPhotoRef = useRef(null);
  const userProfileRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setImageFileURL(currentUser.profilePhotoURL);
    }
  }, [currentUser]);

  const handleImageUpload = event => {
    if (event.target.files.length === 1) {
      const image = event.target.files[0];
      setImageFile(image);
      const objectURL = URL.createObjectURL(image);
      userProfileRef.current.src = objectURL;
      setTempImageFileURL(objectURL);
      setShowUpload(true);
    }
  };

  const showRequestLoading = profilePhotoUpdating => {
    return (
      <RequestLoading
        type='circle'
        className='center-loader'
        show={profilePhotoUpdating}
      />
    );
  };

  const undoImageSelection = () => {
    setTempImageFileURL('');
    setImageFile('');
    setShowUpload(false);
  };

  const confirmPhotoUpload = async () => {
    setShowUpload(false);
    const formData = new FormData();
    formData.append('profile_photo_file', imageFile);
    await updateProfilePhotoAction(formData);
    // setTempImageFileURL('');
    setImageFile('');
  };

  const getProfileImageURL = () => {
    if (tempImageFileURL) {
      return tempImageFileURL;
    } else if (imageFileURL) {
      return CHAT_API_URL + '/' + imageFileURL;
    } else {
      return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
    }
  };

  const showUploadButton = () => {
    if (showUpload) {
      return (
        <span
          onClick={confirmPhotoUpload}
          className='add-photo  success confirm-upload left'>
          <Icon icon='cloud_done' color='neutral' size='35px' />
        </span>
      );
    }
  };
  const showChooseUndoButton = () => {
    if (imageFile && !profilePhotoUpdating) {
      return (
        <span className='add-photo' onClick={undoImageSelection}>
          <Icon icon='undo' color='neutral' size='35px' />
        </span>
      );
    } else if (!imageFile && !profilePhotoUpdating) {
      return (
        <span className='add-photo'>
          <Icon
            iconClick={() => UserPhotoRef.current.click()}
            icon='photo_camera'
            color='neutral'
            size='35px'
          />
        </span>
      );
    }
  };

  return (
    <Fragment>
      <div className='user-profile-photo  center-absolute'>
        <div className='img-container'>
          <input
            style={{ display: 'none' }}
            type='file'
            ref={UserPhotoRef}
            className='form-control-file'
            id='exampleFormControlFile1'
            name='photoURL'
            onChange={handleImageUpload}
            accept='image/*'
          />
          {showRequestLoading(profilePhotoUpdating)}
          <div
            onClick={() => UserPhotoRef.current.click()}
            className='circle'
            style={{
              height: '200px',
              width: '200px',
              border: ' 6px solid rgb(226, 226, 226)',
              backgroundImage: `url(${getProfileImageURL()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: ' no-repeat',
            }}
            ref={userProfileRef}></div>
          {showUploadButton()}
          {showChooseUndoButton()}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    profilePhotoUpdating: state.api.profilePhotoUpdating,
  };
};

export default connect(mapStateToProps, {
  updateProfilePhotoAction,
})(ProfilePhoto);

import React, { useRef, useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Icon from '../../../shared/icon/Icon';
import Button from '../../../shared/form-inputs/button/Button';
import { CHAT_API_URL } from '../../../utils/api-settings';
import RequestLoading from '../../../shared/request-loading/RequestLoading';
import DefaultCoverImage from '../../../images/default-cover-photo.jpg';
import { updateCoverPhotoAction } from '../../../redux/actions/user.actions';
import './profile-banner.style.css';

const ProfileBanner = ({ currentUser, updateCoverPhotoAction }) => {
  const [coverImageTempFileURL, setCoverImageTempFileURL] = useState(''); //stores selected file from the dialogue
  const [coverImageFile, setCoverImageFile] = useState(''); //store the form formatted file
  const [coverImageFileURL, setCoverImageFileURL] = useState(''); //stores the file url from the api request
  const [showCoverImageUpload, setShowCoverImageUpload] = useState(false); //show or hide the upload button
  const [uploadingCoverPhoto, setUploadingCoverPhoto] = useState(false); //show or hide the upload button

  const coverPhotoRef = useRef(null);
  const coverPhotoFileRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setCoverImageFileURL(currentUser.coverPhotoURL);
    }
  }, [currentUser]);

  const handleCoverImageUpload = event => {
    if (event.target.files.length === 1) {
      const image = event.target.files[0];
      setCoverImageFile(image); //store the image file in the state
      const objectURL = URL.createObjectURL(image); //create the object for the temp URL
      setCoverImageTempFileURL(objectURL);
      setShowCoverImageUpload('true'); // shows the upload / undo buttons
    }
  };
  const getCoverImageURL = () => {
    if (coverImageTempFileURL) {
      return coverImageTempFileURL;
    } else if (coverImageFileURL) {
      return CHAT_API_URL + '/' + coverImageFileURL;
    } else {
      return DefaultCoverImage;
    }
  };

  const undoCoverPhoto = () => {
    setCoverImageFile('');
    setCoverImageTempFileURL('');
    setShowCoverImageUpload(false);
  };

  const uploadCoverPhoto = async () => {
    setUploadingCoverPhoto(true); //The loading animation
    setShowCoverImageUpload(false);
    const formData = new FormData();
    formData.append('cover_photo_file', coverImageFile);
    await updateCoverPhotoAction(formData);
    setCoverImageTempFileURL('');
    setUploadingCoverPhoto(false); //turn off loading animation
  };

  const showRequestLoading = show => {
    return (
      <RequestLoading type='circle' className='center-loader' show={show} />
    );
  };

  return (
    <div
      ref={coverPhotoRef}
      style={{
        backgroundImage: `url(${getCoverImageURL()})`,
      }}
      className='user-header-banner'>
      {uploadingCoverPhoto && (
        <div className='cover-photo-loading'>
          {showRequestLoading(true)}
          <p>Updating cover photo...</p>
        </div>
      )}

      <div className='edit-cover-photo'>
        <input
          style={{ display: 'none' }}
          type='file'
          ref={coverPhotoFileRef}
          className='form-control-file'
          id='coverPhotoFile'
          name='coverPhoto'
          onChange={handleCoverImageUpload}
          accept='image/*'
        />

        {showCoverImageUpload ? (
          <Fragment>
            <Button
              type='submit'
              size='medium'
              name='update_cover_photo'
              color='btn-success'
              style={{ marginRight: '10px' }}
              buttonCallback={uploadCoverPhoto}>
              Save
              <Icon
                className='left'
                icon='cloud_upload'
                color='neutral'
                size='25px'
              />
            </Button>
            <Button
              type='submit'
              size='medium'
              name='update_cover_photo'
              color='btn-danger'
              buttonCallback={undoCoverPhoto}>
              Undo
              <Icon className='left' icon='undo' color='neutral' size='25px' />
            </Button>
          </Fragment>
        ) : (
          <Button
            type='submit'
            size='medium'
            name='update_cover_photo'
            color='btn-primary'
            buttonCallback={() => coverPhotoFileRef.current.click()}>
            Cover Photo
            <Icon
              className='left'
              icon='photo_camera'
              color='neutral'
              size='25px'
            />
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  updateCoverPhotoAction,
})(ProfileBanner);

import React, { useRef, useEffect } from 'react';
import './video-receiver.style.css';
import { connect } from 'react-redux';
import RequestLoading from '../../request-loading/RequestLoading';

const VideoReceiver = ({
  receiverStream,
  requestMessage,
  incomingStream,
  receiver_info,
}) => {
  const receiverVideoRef = useRef();

  useEffect(() => {
    if (
      receiverStream &&
      Object.keys(receiverStream).length === 0 &&
      receiverStream.constructor === Object
    ) {
    } else if (receiverStream !== null) {
      receiverVideoRef.current.srcObject = receiverStream;
    }
  }, [receiverStream]);

  return (
    <div className='receiver-video'>
      {receiverStream !== null ? (
        <div className='receiver-video-container'>
          <video
            id='receiverVideo'
            style={{
              display: `${receiverStream === null ? 'hidden' : 'block'}`,
            }}
            ref={receiverVideoRef}
            autoPlay
            playsInline>
            <source src=' ' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className='waiting-for-connection'>
          <RequestLoading show='true' type='circle' />
          <p className='connecting-text'>
            {' '}
            {requestMessage ? requestMessage : 'Waiting for connection'}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    receiverStream: state.call.receiverStream,
    incomingStream: state.call.incomingStream,
  };
};

export default connect(mapStateToProps, null)(VideoReceiver);

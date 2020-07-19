import React, { useRef, useEffect } from 'react';
import './video-caller.style.css';
import { connect } from 'react-redux';

const VideoCaller = ({ callerStream, incomingStream }) => {
  const callerVideoRef = useRef();

  useEffect(() => {
    if (
      callerStream &&
      Object.keys(callerStream).length === 0 &&
      callerStream.constructor === Object
    ) {
    } else {
      callerVideoRef.current.srcObject = callerStream;
    }
  }, [callerStream]);

  return (
    <div className='caller-video'>
      <div className='caller-video-container'>
        <video id='callVideo' muted ref={callerVideoRef} autoPlay playsInline>
          <source src='' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    callerStream: state.call.callerStream,
    incomingStream: state.call.incomingStream,
  };
};

export default connect(mapStateToProps, null)(VideoCaller);

import React, { useEffect, useRef, Fragment, useContext } from 'react';
import Modal from '../../modal/Modal';
import { connect } from 'react-redux';
import M from 'materialize-css';
import './icoming-call.styles.css';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import RoundImage from '../../round-image/RoundImage';
import {
  IncomingCallAcceptedAction,
  endIncomingCallAction,
  updateAudioStreamAction,
} from '../../../redux/actions/call.action';
import incomingCallURL from '../../../sounds/incoming_call.mp3';
import SocketContext from '../../../contexts/socket-context';
import { toggleModal } from '../../../utils/general';
import { get_audio_permission } from '../../../utils/api-settings';
const IncomingCall = props => {
  const {
    browerMediaStream,
    currentUser,
    incomingCall,
    incomingStream,
    incomingCallAccepted,
    IncomingCallAcceptedAction,
    endIncomingCallAction,
    updateAudioStreamAction,
  } = props;

  const callAudioRef = useRef(null);
  const callSourceRef = useRef(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    (async () => {
      if (
        incomingCall &&
        incomingStream &&
        incomingStream.callerId !== currentUser.id
      ) {
        try {
          callAudioRef.current.play();
          if (!browerMediaStream) {
            const stream = await get_audio_permission();
            if (!stream.id) {
              toggleModal('incoming-call-alert', 'hide');
              declineCall();
            } else {
              updateAudioStreamAction(stream);
              toggleModal('incoming-call-alert', 'show');
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    })();
  }, [incomingCall, incomingStream]);

  useEffect(() => {
    if (incomingCallAccepted) {
      toggleModal('incoming-call-alert', 'hide');
    }
  }, [incomingCallAccepted]);

  useEffect(() => {
    if (socket) {
      socket.on('callEnded', () => {
        declineCall();
      });
    }
    return () => {};
  }, [socket, incomingStream]);

  const acceptCall = () => {
    try {
      IncomingCallAcceptedAction();
      callAudioRef.current.pause();
      callAudioRef.current.currentTime = 0;
    } catch (error) {
      console.log(error.message);
    }
  };

  const declineCall = () => {
    try {
      if (incomingStream) {
        endIncomingCallAction(incomingStream.callerId);
        toggleModal('incoming-call-alert', 'hide');
        callAudioRef.current.pause();
        callAudioRef.current.currentTime = 0;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (incomingStream !== null) {
    return (
      <Modal id='incoming-call-alert'>
        <audio
          id='callAudio'
          preload='none'
          style={{ display: 'none' }}
          className='raw-player'
          controls
          loop
          ref={callAudioRef}>
          <source ref={callSourceRef} src={incomingCallURL} type='audio/mpeg' />
        </audio>
        <section className='incoming-call-alert-section'>
          <div className='incoming-call-alert-section-title'>
            <span>{incomingStream.callerName} is calling</span>
          </div>
          <div className='incoming-call-alert-section-image'>
            <div style={{ margin: ' 0 auto' }}>
              <RoundImage size='150px' />
            </div>
          </div>
          <div className='incoming-call-alert-section-buttons'>
            <Button
              type='button'
              name='unfriend-btn'
              color='btn-success'
              buttonCallback={acceptCall}
              style={{ marginRight: '10px' }}>
              ACCEPT
              <Icon
                className='right'
                icon='phone'
                color='neutral'
                size='21px'
              />
            </Button>
            <Button
              type='button'
              name='unfriend-btn'
              color='btn-danger'
              buttonCallback={declineCall}>
              DECLINE
              <Icon
                className='right'
                icon='call_end'
                color='neutral'
                size='21px'
              />
            </Button>
          </div>
        </section>
      </Modal>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const mapStateToProps = state => {
  return {
    incomingCall: state.call.incomingCall,
    currentUser: state.auth.currentUser,
    incomingStream: state.call.incomingStream,
    audioStream: state.call.stream,
    incomingCallAccepted: state.call.incomingCallAccepted,
    browerMediaStream: state.call.stream,
  };
};

export default connect(mapStateToProps, {
  IncomingCallAcceptedAction,
  endIncomingCallAction,
  updateAudioStreamAction,
})(IncomingCall);

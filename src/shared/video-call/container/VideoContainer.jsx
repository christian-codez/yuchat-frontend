import React, { useEffect, useState, useContext, Fragment } from 'react';
import { connect } from 'react-redux';
import Peer from 'simple-peer';
import SocketContext from '../../../contexts/socket-context';

/*--------------------- components ---------------------*/
import Modal from '../../modal/Modal';
import VideoReceiver from '../receiver/VideoReceiver';
import VideoCaller from '../caller/VideoCaller';
import ActionButtons from '../call-actions/ActionButtons';
import CallHeader from '../call-header/CallHeader';

/*--------------------- Actions ---------------------*/
import {
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallInitiated,
  audioCallAccepted,
  endIncomingCallAction,
  endOutgoingCallAction,
  hideCallModalAction,
  PeersConnectedAction,
} from '../../../redux/actions/call.action';

import { TURN_SERVER_CONFIG } from '../../../utils/general';

/*--------------------- Styling ---------------------*/
import './video-container.style.css';
import { streamIsValid, toggleModal } from '../../../utils/general';
import { destroyPeer } from '../../../utils/api-settings';
import CallTimer from '../timer/CallTimer';

const VideoContainer = ({
  currentUser,
  chattingWith,
  outGoingCall,
  receiverStream,
  incomingCallAccepted,
  browerMediaStream,
  showModal,
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallAccepted,
  audioCallInitiated,
  incomingStream,
  endOutgoingCallAction,
  endIncomingCallAction,
  hideCallModalAction,
  PeersConnectedAction,
}) => {
  const [outgoingPeerStatus, setOutgoingPeerStatus] = useState(null);
  const [incomingPeerStatus, setIncomingPeerStatus] = useState(null);
  const [requestMessage, setRequestMessage] = useState(null);
  const { socket, socketID } = useContext(SocketContext);

  useEffect(() => {
    if (showModal) {
      toggleModal('video-id', 'show');
    } else {
      toggleModal('video-id', 'hide');
    }
  }, [showModal]);

  useEffect(() => {
    if (outGoingCall) {
      (async () => {
        if (!streamIsValid(browerMediaStream)) {
          endOutgoingCallAction();
          alert(
            'CALL COULD NOT BE COMPLETED!\nPlease allow app to access your audio and video stream before making a call!'
          );
        } else if (browerMediaStream) {
          toggleModal('video-id', 'show');
          createInitiatorPeerConnection(browerMediaStream);
        }
      })();
    }
  }, [outGoingCall]);

  useEffect(() => {
    if (incomingCallAccepted) {
      (async () => {
        if (!streamIsValid(browerMediaStream)) {
          alert(
            'CALL COULD NOT BE COMPLETED!\nPlease allow app to access your audio and video stream before making a call!'
          );
          endIncomingCallAction();
        } else if (browerMediaStream) {
          toggleModal('video-id', 'show');
          receiverPeerActivities(browerMediaStream);
        }
      })();
    } else {
      toggleModal('video-id', 'hide');
    }
  }, [incomingCallAccepted]);

  const modalClose = () => {
    hideCallModalAction();
    toggleModal('video-id', 'hide');
  };

  const createInitiatorPeerConnection = stream => {
    //Create our peer connection
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        trickle: false,
        stream: stream,
        config: {
          iceServers: TURN_SERVER_CONFIG,
        },
      });

      setOutgoingPeerStatus(peer);
      addCallerStreamAction(stream);

      peer.on('signal', signal => {
        //configure the signal data
        const callInfo = {
          receiverID: chattingWith.id,
          signalData: signal,
          callerId: currentUser.id,
          receiverInfo: chattingWith,
          callerName: currentUser.firstname,
          socketID: socketID,
        };

        setRequestMessage(null);
        audioCallInitiated(callInfo);

        //End the call if the user doesnt pick the call after 2 mins
        // setTimeout(() => {
        //   if (!receiverStream) {
        //     console.log(receiverStream);
        //     endInitiatorCall(peer);
        //     endOutgoingCallAction(chattingWith.id);
        //   }
        // }, 20000);
      });

      peer.on('stream', stream => {
        console.log(stream);
        addReceiverStreamAction(stream);
        PeersConnectedAction(true);
      });

      peer.on('close', data => {
        endInitiatorCall(peer);
      });

      peer.on('connect', () => {
        console.log('CONNECTED!');
        setRequestMessage(null);
      });

      socket.on('callAccepted', signal => {
        if (!signal.renegotiate && peer.readable) {
          peer.signal(signal);
        }
      });

      socket.on('receiverNotAvailable', message => {
        setRequestMessage(message);
        endInitiatorCall(peer);
      });

      socket.on('callEnded', data => {
        endInitiatorCall(peer);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const receiverPeerActivities = browerMediaStream => {
    const receiverPeer = new Peer({
      initiator: false,
      trickle: false,
      trickle: false,
      stream: browerMediaStream,
    });

    setIncomingPeerStatus(receiverPeer);

    addCallerStreamAction(browerMediaStream);

    receiverPeer.on('signal', signal => {
      const acceptInfo = {
        signal: signal,
        receiverId: incomingStream.callerId,
      };
      if (!signal.renegotiate) {
        audioCallAccepted(acceptInfo);
      }
    });

    receiverPeer.on('close', () => {
      if (receiverPeer) {
        destroyPeer(receiverPeer);
        PeersConnectedAction(false);
      }
      setIncomingPeerStatus('closed');
      setIncomingPeerStatus(null);
      endIncomingCallAction();
      window.location.reload();
    });

    receiverPeer.on('stream', stream => {
      addReceiverStreamAction(stream);
      PeersConnectedAction(true);
    });

    receiverPeer.signal(incomingStream.signalData);

    socket.on('callEnded', data => {
      if (receiverPeer) {
        destroyPeer(receiverPeer);
        PeersConnectedAction(false);
      }
      setIncomingPeerStatus('closed');
      setTimeout(() => {
        setIncomingPeerStatus(null);
        endIncomingCallAction();
      }, 3000);
    });
  };

  const endInitiatorCall = (peer, message) => {
    if (peer) {
      destroyPeer(peer);
      PeersConnectedAction(false);
    }
    setOutgoingPeerStatus('closed');
    setOutgoingPeerStatus(null);
    endOutgoingCallAction();
    window.location.reload();
  };

  return (
    <Modal
      modalClose={modalClose}
      id='video-id'
      header={
        <CallHeader
          name={chattingWith ? chattingWith.firstname : ''}
          photoURL={chattingWith ? chattingWith.profilePhotoURL : ''}
        />
      }
      className='modal-fixed-footer call-modal'>
      <section className='video-convo-container'>
        <VideoCaller />
        <VideoReceiver requestMessage={requestMessage} />
        <div className='floating-content'>
          <CallTimer />
          <ActionButtons />
        </div>
        {incomingPeerStatus === 'closed' && (
          <div className='call-ended'>Call Ended</div>
        )}{' '}
        {outgoingPeerStatus === 'closed' && (
          <div className='call-ended'>Call Ended</div>
        )}
      </section>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    chattingWith: state.chat.chattingWith,
    browerMediaStream: state.call.stream,
    outGoingCall: state.call.outGoingCall,
    incomingCall: state.call.incomingCall,
    receiverStream: state.call.receiverStream,
    incomingCallAccepted: state.call.incomingCallAccepted,
    incomingStream: state.call.incomingStream,
    showModal: state.call.showModal,
  };
};

export default connect(mapStateToProps, {
  addCallerStreamAction,
  addReceiverStreamAction,
  audioCallInitiated,
  audioCallAccepted,
  endOutgoingCallAction,
  endIncomingCallAction,
  hideCallModalAction,
  PeersConnectedAction,
})(VideoContainer);

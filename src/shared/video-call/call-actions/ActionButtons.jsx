import React, { Fragment, useState } from 'react';
import Button from '../../form-inputs/button/Button';
import Icon from '../../icon/Icon';
import { connect } from 'react-redux';
import {
  endOutgoingCallAction,
  endIncomingCallAction,
  updateAudioStreamAction,
} from '../../../redux/actions/call.action';
import {
  stopVideoOnly,
  stopBothVideoAndAudio,
  stopAudioOnly,
} from '../../../utils/api-settings';

import './action-button.style.css';
const ActionButtons = ({
  outGoingCall,
  receiver_info,
  peersConnected,
  incomingCallAccepted,
  endOutgoingCallAction,
  endIncomingCallAction,
  incomingStream,
  stream,
}) => {
  const [muteVideoButton, setMuteVideoButton] = useState(false);
  const [muteAudioButton, setMuteAudioButton] = useState(false);
  const endCall = async () => {
    if (outGoingCall) {
      endOutgoingCallAction(receiver_info.receiverID);
    } else if (incomingCallAccepted) {
      endIncomingCallAction(incomingStream.callerId);
    }
    stopBothVideoAndAudio();
  };

  const muteVideo = () => {
    const status = !muteVideoButton;
    stopVideoOnly(status);
    setMuteVideoButton(status);
  };

  const muteAudio = () => {
    const status = !muteAudioButton;
    stopAudioOnly(status);
    setMuteAudioButton(status);
  };

  const callAudioMediaControlButtons = () => {
    if (muteAudioButton) {
      return (
        <Button
          className='btn-floating off call-control mic'
          type='button'
          name='unfriend-btn'
          color='btn-primary'
          buttonCallback={muteAudio}>
          <Icon className='' icon='mic' color='neutral' size='21px' />
        </Button>
      );
    } else {
      return (
        <Button
          className='btn-floating call-control on mic'
          type='button'
          name='unfriend-btn'
          color='btn-primary'
          buttonCallback={muteAudio}>
          <Icon className='' icon='mic_off' color='neutral' size='21px' />
        </Button>
      );
    }
  };

  const callVideoMediaControlButtons = () => {
    if (muteVideoButton) {
      return (
        <Button
          className='btn-floating call-control off videocam'
          type='button'
          name='unfriend-btn'
          color='btn-warning'
          buttonCallback={muteVideo}>
          <Icon className='' icon='videocam' color='neutral' size='21px' />
        </Button>
      );
    } else {
      return (
        <Button
          className='btn-floating call-control on videocam'
          type='button'
          name='unfriend-btn'
          color='btn-warning'
          buttonCallback={muteVideo}>
          <Icon className='' icon='videocam_off' color='neutral' size='21px' />
        </Button>
      );
    }
  };

  return (
    <Fragment>
      {peersConnected && callAudioMediaControlButtons()}
      {peersConnected && callVideoMediaControlButtons()}

      <Button
        className='btn-floating callend'
        type='button'
        name='unfriend-btn'
        color='btn-danger'
        buttonCallback={endCall}>
        <Icon className='' icon='call_end' color='neutral' size='21px' />
      </Button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    outGoingCall: state.call.outGoingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
    stream: state.call.stream,
    incomingStream: state.call.incomingStream,
    receiver_info: state.call.receiver_info,
    peersConnected: state.call.peersConnected,
  };
};

export default connect(mapStateToProps, {
  endOutgoingCallAction,
  endIncomingCallAction,
  updateAudioStreamAction,
})(ActionButtons);

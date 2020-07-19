import React, { Fragment } from 'react';
import './floating-call-button.style.css';
import Icon from '../../icon/Icon';
import { connect } from 'react-redux';
import { showCallModalAction } from '../../../redux/actions/call.action';

const FloatingCallButton = ({
  showCallModalAction,
  showModal,
  outGoingCall,
  incomingCallAccepted,
}) => {
  if (!showModal && (outGoingCall || incomingCallAccepted)) {
    return (
      <div className='flaoting-call-button'>
        <a
          href='javascript:void(0);'
          class='btn-floating btn-large waves-effect waves-light red'
          onClick={showCallModalAction}>
          <Icon icon='dialpad' color='neutral' size='25px' />
        </a>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const mapStateToProps = state => {
  return {
    showModal: state.call.showModal,
    outGoingCall: state.call.outGoingCall,
    incomingCallAccepted: state.call.incomingCallAccepted,
  };
};

export default connect(mapStateToProps, { showCallModalAction })(
  FloatingCallButton
);

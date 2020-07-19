import apiConfig from '../../api-config/config';
import { audio_call_actions } from '../types';

export const audioCallInitiated = callInfo => {
  return async dispatch => {
    try {
      const response = await apiConfig.post('/api/calls/audio-call-initiated', {
        callInfo: callInfo,
      });

      if (200 === response.status) {
        dispatch({
          type: audio_call_actions.USER_CALL_INITIATED,
          payload: callInfo,
        });
      }
    } catch (e) {}
  };
};
export const audioCallAccepted = acceptInfo => {
  return async dispatch => {
    try {
      const response = await apiConfig.post('/api/calls/audio-call-accepted', {
        acceptInfo: acceptInfo,
      });

      if (200 === response.status) {
        dispatch({
          type: audio_call_actions.USER_CALL_INITIATED,
        });
      }
    } catch (e) {}
  };
};
export const updateCallStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.CALL_STREAM_UPDATED,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};

export const updateAudioStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.AUDIO_STREAM,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
export const addCallerStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.ADD_CALLER_STREAM,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
export const removeCallerStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.REMOVE_CALLER_STREAM,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
export const addReceiverStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.ADD_RECEIVER_STREAM,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
export const removeReceiverStreamAction = stream => {
  return async dispatch => {
    try {
      if (stream) {
        dispatch({
          type: audio_call_actions.REMOVE_RECEIVER_STREAM,
          payload: stream,
        });
      }
    } catch (e) {}
  };
};
export const showCallModalAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.SHOW_CALL_MODAL,
      });
    } catch (e) {}
  };
};
export const hideCallModalAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.HIDE_CALL_MODAL,
      });
    } catch (e) {}
  };
};
export const startOutgoingCallAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.START_OUTGOING_CALL,
      });
    } catch (e) {}
  };
};
export const startIncomingCallAction = incomingCallData => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.START_INCOMING_CALL,
        payload: incomingCallData,
      });
    } catch (e) {}
  };
};
export const IncomingCallAcceptedAction = () => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.INCOMING_CALL_ACCEPTED,
      });
    } catch (e) {}
  };
};
export const IncomingCallRejectedAction = incomingCallData => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.INCOMING_CALL_REJECTED,
        payload: incomingCallData,
      });
    } catch (e) {}
  };
};
export const endOutgoingCallAction = receiverID => {
  return async dispatch => {
    try {
      if (receiverID) {
        const response = await apiConfig.post(
          `/api/calls/call-ended/${receiverID}`
        );

        if (200 === response.status) {
          dispatch({
            type: audio_call_actions.END_OUTGOING_CALL,
          });
        }
      } else {
        dispatch({
          type: audio_call_actions.END_OUTGOING_CALL,
        });
      }
    } catch (e) {}
  };
};
export const endIncomingCallAction = callerID => {
  return async dispatch => {
    try {
      if (callerID) {
        const response = await apiConfig.post(
          `/api/calls/call-ended/${callerID}`
        );

        if (200 === response.status) {
          dispatch({
            type: audio_call_actions.END_INCOMING_CALL,
          });
        }
      } else {
        dispatch({
          type: audio_call_actions.END_INCOMING_CALL,
        });
      }
    } catch (e) {}
  };
};
export const PeersConnectedAction = status => {
  return async dispatch => {
    try {
      dispatch({
        type: audio_call_actions.CALL_PEERS_CONNECTED,
        payload: status,
      });
    } catch (e) {}
  };
};

import M from 'materialize-css';

export const streamIsValid = stream => {
  return stream.id ? true : false;
};

export const toggleModal = (id, state) => {
  let elems = document.getElementById(id);
  let modal = M.Modal.init(elems, { dismissible: false });
  if ('show' === state) {
    modal.open();
  } else if ('hide' === state) {
    modal.close();
  }
};

export const TURN_SERVER_CONFIG = [
  // { urls: 'stun:stun.l.google.com:19302' },
  // { urls: 'stun:numb.viagenie.ca:3478' },
  // { urls: 'stun:stun.sipnet.net:3478' },
  // { urls: 'stun:stun.sipnet.ru:3478' },
  // {
  //   urls: 'stun:numb.viagenie.ca',
  //   username: 'sultan1640@gmail.com',
  //   credential: '98376683',
  // },
  // {
  //   urls: 'turn:numb.viagenie.ca',
  //   username: 'sultan1640@gmail.com',
  //   credential: '98376683',
  // },
  {
    urls: 'turn:relay.backups.cz',
    credential: 'webrtc',
    username: 'webrtc',
  },
  // {
  //   urls: 'turn:relay.backups.cz?transport=tcp',
  //   credential: 'webrtc',
  //   username: 'webrtc',
  // },
];

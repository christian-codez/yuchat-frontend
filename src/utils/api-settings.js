//export const CHAT_API_URL = 'https://yuchatapi.herokuapp.com';
export const CHAT_API_URL = 'http://localhost:4000';

export const BuildImageURL = path => {
  if (!path) {
    return 'https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png';
  }
  return CHAT_API_URL + '/' + path;
};

export const get_audio_permission = async () => {
  try {
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return audioStream;
  } catch (error) {
    return false;
  }
};

// stop both mic and camera
export const stopBothVideoAndAudio = async () => {
  const stream = await get_audio_permission();
  if (stream) {
    stream.getTracks().map(function (track) {
      track.stop();
    });
  }
};

// stop only camera
export const stopVideoOnly = async status => {
  const videoRef = document.getElementById('callVideo');
  if (videoRef) {
    videoRef.srcObject.getTracks().map(async track => {
      if (track.readyState == 'live' && track.kind === 'video') {
        track.enabled = !track.enabled;
      }
    });
  }
};

// start only camera
// export const startVideoOnly = stream => {
//   console.log('Video started!');
//   console.log(stream);
//   if (stream) {
//     stream.getTracks().forEach(function (track) {
//       if (track.readyState == 'live' && track.kind === 'video') {
//         track.play();
//       }
//     });
//   } else {
//     console.log('Hello');
//   }
// };

// stop only mic
export const stopAudioOnly = status => {
  const videoRef = document.getElementById('callVideo');
  if (videoRef) {
    videoRef.srcObject.getTracks().map(function (track) {
      if (track.readyState == 'live' && track.kind === 'audio') {
        track.enabled = !track.enabled;
      }
    });
  }

  // stream.getTracks().forEach(function (track) {
  //   if (track.readyState == 'live' && track.kind === 'audio') {
  //     track.stop();
  //   }
  // });
};

export const destroyPeer = peer => {
  if (peer) {
    peer.destroy();
    peer = null;
  }
};

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import './call-timer.styl.css';
const CallTimer = ({ peersConnected }) => {
  const [active, setActive] = useState(false);
  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();

  let timeInterval;

  useEffect(() => {
    if (peersConnected) {
      timeInterval = setInterval(count, 1000);
      //console.log('Interval', timeInterval);
    } else {
      resetTimer();
      //console.log('cleared Interval', timeInterval);
    }

    return () => {
      resetTimer();
    };
  }, [peersConnected]);

  const resetTimer = () => {
    if (hoursRef.current && minutesRef.current && secondsRef.current) {
      clearInterval(timeInterval);
      hoursRef.current.innerText = '00';
      minutesRef.current.innerText = '00';
      secondsRef.current.innerText = '00';
    }
  };

  const count = () => {
    let hour, mins, secs;
    if (hoursRef.current && minutesRef.current && secondsRef.current) {
      hour = Number(hoursRef.current.innerText);
      mins = Number(minutesRef.current.innerText);
      secs = Number(secondsRef.current.innerText);

      secs++;

      secondsRef.current.innerText = plz(secs);
      if (secs == 60) {
        secs = 0;
        mins = mins++;
        secondsRef.current.innerText = plz(secs);
        minutesRef.current.innerText = plz(mins);
      }
      if (mins == 60) {
        mins = 0;
        hour = hour++;
        minutesRef.current.innerText = plz(mins);
        hoursRef.current.innerText = plz(hour);
      }
    }
  };

  function plz(digit) {
    var zpad = digit + '';
    if (digit < 10) {
      zpad = '0' + zpad;
    }
    return zpad;
  }

  function pad(val) {
    let valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }

  if (peersConnected) {
    return (
      <div className='call-timer'>
        <span ref={hoursRef} id='hours'>
          00
        </span>
        <span className='separator'>:</span>
        <span ref={minutesRef} id='minutes'>
          00
        </span>
        <span className='separator'>:</span>
        <span ref={secondsRef} id='seconds'>
          00
        </span>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

const mapStateToProps = state => {
  return {
    peersConnected: state.call.peersConnected,
  };
};

export default connect(mapStateToProps, null)(CallTimer);

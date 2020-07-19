import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <React.Fragment>
      <div className='loading'>
        <div className='loadingWrapper'>
          <div id='loading'> </div>
          <h1>Loading . . .</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loading;

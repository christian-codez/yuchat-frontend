import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';
import { loginTokenAction } from './redux/actions/auth.actions';
import { updateAudioStreamAction } from './redux/actions/call.action';
import messageURL from './sounds/message_received2.mp3';
import VideoContainer from './shared/video-call/container/VideoContainer';
import IncomingCall from './shared/video-call/incoming-call/IncomingCall';
import FloatingCallButton from './shared/video-call/floating-call-button/FloatingCallButton';
import SocketObservers from './shared/socket-observers/SocketObservers';
import AuthPage from './pages/user-auth/AuthPage';
import './App.css';
import Spinner from './shared/spinner/spinner';
import ErrorBoundary from './shared/error-boundary/ErrorBoundary';

const ChatMessagesPage = lazy(() =>
  import('./pages/chat-messages/ChatMessagesPage')
);
const People = lazy(() => import('./pages/people/People'));
const FriendsPage = lazy(() => import('./pages/friends-page/FriendsPage'));
const VerifyAccountPage = lazy(() =>
  import('./pages/verify-account-page/VerifyAccountPage')
);
const UserProfilePage = lazy(() =>
  import('./pages/user-profile/UserProfilePage')
);

const App = ({ loginTokenAction }) => {
  const sourceRef = useRef(null);
  const audioRef = useRef(null);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem('user');
      //const currentUrl = window.location.href;
      //const verify_account = currentUrl.includes('/account-verification/');
      if (userToken) {
        loginTokenAction(userToken);
      } else {
        history.push('/login');
      }
    })();
  }, []);

  return (
    <div className='container u-chat-container'>
      <div className='header'>
        <Navigation />
      </div>
      <div className='main'>
        <audio
          id='musicaudio'
          preload='none'
          style={{ display: 'none' }}
          className='raw-player'
          controls
          ref={audioRef}>
          <source
            ref={sourceRef}
            src={messageURL ? messageURL : ''}
            type='audio/mpeg'
          />
        </audio>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={ChatMessagesPage} />
              <Route exact path='/login' component={AuthPage} />
              <Route exact path='/messenger' component={ChatMessagesPage} />
              <Route exact path='/people' component={People} />
              <Route exact path='/me' component={UserProfilePage} />
              <Route exact path='/friends' component={FriendsPage} />
              <Route
                exact
                path='/account-verification/:token'
                component={VerifyAccountPage}
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
        <SocketObservers audioRef={audioRef} />
        <IncomingCall />
        <VideoContainer />
        <FloatingCallButton />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
};

export default connect(null, {
  loginTokenAction,
  updateAudioStreamAction,
})(App);

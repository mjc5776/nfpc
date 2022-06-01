import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './components/Home';
import Locked from './components/Locked';
import Profile from './components/Profile';
import Players from './components/PlayerList/Players';
import PlayerDetail from './components/PlayerDetail/PlayerDetail';
import NewRequest from './components/Requests/NewRequest';
import PendingRequest from './components/Requests/PendingRequest';
import ApprovedRequest from './components/Requests/ApprovedRequest';
import { oktaConfig } from './lib/oktaConfig';
import Navbar from './components/Nav/Navbar';

const CALLBACK_PATH = '/login/callback';

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <>
    
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Router>
        <Switch>
          <Route path='/' exact component={Players} />
          <Route path='/playerdetail/:id' component={PlayerDetail} />
          <Route path='/newrequest/:id' component={NewRequest} />
          <Route path='/pending' component={PendingRequest} />
          <Route path='/approved' component={ApprovedRequest} />
          <Route path={CALLBACK_PATH} exact component={LoginCallback} />
          <SecureRoute path='/locked' exact component={Locked} />
          <SecureRoute path='/profile' component={Profile} />
        </Switch>
      </Router>
    </Security>
    </>
  );
};

export default App;

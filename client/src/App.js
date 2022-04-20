import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './components/Home';
import Locked from './components/Locked';
import Profile from './components/Profile';
import Players from './components/PlayerList/Players';
import { oktaConfig } from './lib/oktaConfig';

const CALLBACK_PATH = '/login/callback';

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Router>
        <Switch>
          <Route path='/' exact component={Players} />
          <Route path={CALLBACK_PATH} exact component={LoginCallback} />
          <SecureRoute path='/locked' exact component={Locked} />
          <SecureRoute path='/profile' component={Profile} />
        </Switch>
      </Router>
    </Security>
  );
};

export default App;

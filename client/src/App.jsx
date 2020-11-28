import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Matches from './pages/Matches/Matches';
import Profile from './pages/Profile/Profile';
import Preferences from './pages/Preferences/Preferences';
import MessageThread from './pages/Inbox/Messages/MessageThread';

import { AppContextProvider } from './context/AppContext';
import './App.css';
import Inbox from './pages/Inbox/Inbox';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inbox/conversation" component={MessageThread} />
          <Route exact path="/matches" component={Matches} />
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route exact path="/profile" component={Profile} /> */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/preferences" component={Preferences} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;

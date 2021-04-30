import { Provider } from 'react-redux';
import React from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import configureStore from './redux/store';
import LoginRoute from './routes/LoginRoute';
import PrivateRoute from './routes/PrivateRoute';
import OccurrencePage from './pages/OccurrencePage/OccurrencesPage';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'><LoginRoute/></Route>
          <PrivateRoute path='/occurrenceForm' component={OccurrencePage}></PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;

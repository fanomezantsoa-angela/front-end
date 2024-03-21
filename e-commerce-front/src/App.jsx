import { useState } from 'react'
import Produits from './components/Produits'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css'

function App() {
  
    

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/inscription" component={Inscription} />
          <Route
            path="/login"
            render={() =>
              isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/">
            {isLoggedIn ? (
              <>
                
                <Route path="/compte" component={Compte} />
                <Route path="/produits" component={Produits} />
                <Route path="/panier" component={Panier} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App

import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContext, FirebaseContextHook } from './store/Context';
import ProductInfoContext from './store/ProductInfoContext';
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';

function App() {

  const {user,setUser} = useContext(AuthContext);
  const {firebase} = FirebaseContextHook();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  });

  return (
    <div>
      <ProductInfoContext>
        <BrowserRouter>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route path="/signup" >
            <Signup />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/create" >
            <Create />
          </Route>
          <Route path="/view" >
            <View />
          </Route>
        </BrowserRouter>
      </ProductInfoContext>
    </div>
  );
}

export default App;

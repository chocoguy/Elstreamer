import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

//!------------COMPONENTS START--------------
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Register from './components/auth/Register';

import Hentai from './components/content/Hentai';
import Hentais from './components/content/Hentais';
import Vod from './components/content/Vod';
import Vods from './components/content/Vods';


import Editorspicks from './components/etc/Editorspicks';
import Help from './components/etc/Help';

import Footer from './components/layout/Footer';
import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';

//!------------COMPONENTS END-----------------





const App = () => {
  return(
    <Provider store = {store}>
   <Router>
     <Fragment>
       <Navbar />
       <Route exact path="/" component = {Main} />
       <section className="container">
         <Switch>
           <Route exact path="/register" component={Register} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/vods" component={Vods} />
           <Route exact path="/vods/:id" component={Vod} />
           <Route exact path="/help" component={Help} />
           <Route exact path="/editors-picks" component={Editorspicks} />
           <PrivateRoute exact path="/hentai" component={Hentais} />
           <PrivateRoute exact path="/hentai/:id" component={Hentai} />
         </Switch>
       </section>
       <Footer />
     </Fragment>
   </Router>
   </Provider>
  )
}
export default App;

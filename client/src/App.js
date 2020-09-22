import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import UserForm from './component/userForm';
import NavBar from './component/navbar';
import DashBoard from './component/dashboard';
import LoginForm from './component/loginform';



function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div className="App">
        <Route path="/user" exact component={UserForm}></Route>
        <Route path="/user/dashboard/:id" exact component={DashBoard}></Route>
        <Route path="/user/login" exact component={LoginForm}></Route>
        
      </div>
    </Router>
  
  );
}

export default App;

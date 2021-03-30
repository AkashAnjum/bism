import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Navbar';
import Wallet from './Wallet';
import  AddDepartment  from "./AddDepartment";
import  AddInternee  from "./AddInternee.js";
import ShowDepartment from './ShowDepartment';
import ShowInternee from './ShowInternee';
import Login from './Login';
import Home from './Home';
function RouteConfig(props) {
  return (
	<div>
        <Router>
          <NavBar/>
            <Switch>
               <Route exact path="/login" component={Login}/> 
               <Route exact path="/" component={Home}/> 
                <Route exact path="/adddepartment" component={AddDepartment}/>
                <Route exact path="/addinternee"  component={AddInternee}/>
                <Route exact path="/viewdepartment"  component={ShowDepartment}/>
                <Route exact path="/viewinternee" exact  component={ShowInternee}/>
                <Route exact path="/wallet/:id/:name"  component={Wallet}/>
                {/* <Route path="/confirm/:token" component={Move}/> */}
            </Switch>
        </Router>
	</div>
  );
}
export default RouteConfig;
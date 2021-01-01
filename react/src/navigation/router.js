import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainScreen from "../screens/MainScreen";
import EmailScreen from "../screens/EmailScreen";
import NavBar from "../components/NavBar";

function Router() {

   const Error = () =>{
        return(
            <div>
                <NavBar/>
                <div style={{display:"flex", justifyContent:"center", margin:"20px"}}>
                    <h1>This Page Not Found.</h1>
                </div>
            </div>
        );
   }

   return(
       <BrowserRouter>
           <Switch>
               <Route component={MainScreen} path="/home" exact/>
               <Route component={EmailScreen} path="/email" exact/>
               <Route component={Error}/>
           </Switch>
       </BrowserRouter>
   );
}

export default Router;
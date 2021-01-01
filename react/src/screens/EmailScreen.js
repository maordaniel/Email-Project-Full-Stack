import React from 'react';
import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs";
import Search from "../components/Search";
import {useSelector} from "react-redux";


function EmailScreen(){
    const auth = useSelector(state => state.auth_reducers);
    return(
        <div >
            <NavBar/>
            <Search/>
            {auth.isLogged ? <Tabs/> : null}
        </div>
    );
}

export default EmailScreen;
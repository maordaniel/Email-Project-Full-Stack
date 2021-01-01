import React from "react";
import {Button, Nav} from "react-bootstrap";
import "../css/main_css.css";
import {GetData} from "../services/api";
import {logout} from "../redux/actions/auth_actions";
import {useDispatch, useSelector} from "react-redux";


function NavBar(){
    const auth = useSelector(state => state.auth_reducers);
    const dispatch = useDispatch();

    const api_logout = async () =>{
        try {
            const res = await GetData('/logout');
            if (res.status === 200) {
                dispatch(logout());
            }
        } catch (e) {
        }
    };

    const logoutButton = () =>{
        if (auth.isLogged){
            return <Button style={{marginLeft:'1em', marginTop:"1px", border:'none', backgroundColor: '#3d678f'}}
                           onClick={api_logout}>
                        Sign Out
                    </Button>
        }
    };

    return(
        <div className={"nav_bar"}>
            <h4 style={{color:'#bea3a3',margin: "15px"}}>
                Email
            </h4>
             <Nav className="justify-content-end" style={{margin:'10px'}}>
                 <Nav.Item>
                    <Nav.Link href="/home"
                              style={{color: window.location.pathname.startsWith("/home") ? "#FFF" : null}}>
                        New Mail
                    </Nav.Link>
                 </Nav.Item>
                 <Nav.Item>
                    <Nav.Link href="/email"
                              style={{color: window.location.pathname.startsWith("/email") ? "#FFF" : null}}>
                        {auth.isLogged ? 'Home' : 'Sign In'}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {logoutButton()}
                </Nav.Item>
             </Nav>
        </div>
    )
}

export default NavBar;
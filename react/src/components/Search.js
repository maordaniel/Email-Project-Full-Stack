import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {login} from "../redux/actions/auth_actions";
import {PostData} from "../services/api";


function Search(){
    const auth = useSelector(state => state.auth_reducers);
    const dispatch = useDispatch();

    const [emailAddress, setEmailAddress] = useState("");
    const [errorEmailAddress,setErrorEmailAddress] = useState('');
    const [successEmailAddress, setSuccessEmailAddress] = useState(false)

    const onKeyPress = (e) => {
        if(e.which === 13)
            api_login();
    }

     const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const api_login = async () =>{
        if (!emailAddress) {
            setErrorEmailAddress('Please fill the your email address.');
            setSuccessEmailAddress(false);
            return
        }else if (!successEmailAddress){
            setErrorEmailAddress(`${emailAddress} is not valid.`);
            return
        }

        const data = {user: emailAddress};
        try {
            const res = await PostData('/login', data);
            if (res.status === 200) {
                setEmailAddress('');
                dispatch(login());
            }
        } catch (e) {
        }
    };

    return(
        <div style={{padding:"3em"}} onKeyPress={onKeyPress}>
                <div className={"search"}>
                    {auth.isLogged ?
                        null
                        :
                        <div>
                            {errorEmailAddress ?
                                <label style={{color:'red'}}>
                                    {errorEmailAddress}
                                </label>
                                :
                                null
                            }

                            <div className={"search"}>
                                <input className={"search_input"} value={emailAddress}
                                    placeholder={"Enter your email address"}
                                    onChange={e => {
                                       setEmailAddress(e.target.value.toLowerCase());
                                       setErrorEmailAddress('');
                                       if (validateEmail(e.target.value)){
                                                setSuccessEmailAddress(true);
                                            }else {
                                                setSuccessEmailAddress(false);
                                            }
                                   }}/>
                                <Button style={{marginLeft:'1em', border:'none', backgroundColor: '#3d678f'}}
                                        onClick={api_login}>
                                   Sign In
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
    );
}

export default Search;

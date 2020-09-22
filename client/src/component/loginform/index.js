import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import userDataService from '../../service/userService';

const LoginForm = props => {


    const token = localStorage.getItem("token")    
    let loggedIn ={};
    if (token == null){
        loggedIn=false;
    }

    const initialUserDetails = {
        email: '',
        password: ''           
    }

    const [currentUserDetail, setCurrentUserDetail] = useState(initialUserDetails);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUserDetail({ ...currentUserDetail, [name]: value });
      };  


      const login = (event) => {
        event.preventDefault();
    
        userDataService.findByEmail(currentUserDetail)

    
         .then( (res)=> {            
            localStorage.setItem('token', 'kjfakaeflvhalejfavn353kn54klll');
            loggedIn=true; 
            props.history.push('/user/dashboard/' + res.data.id);
        })
        .catch(error =>{
            console.log(error);
        })           
      }

  return(
    <div>
        {loggedIn ? 
        ( 
          (  <Redirect to='/user'/> )
        ) : (
            <div className="form-container">
            <h1>Log In</h1>

                <div>
                    <div className="form-group">
                        
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        placeholder="Email"
                        value={currentUserDetail.email}
                        onChange={handleInputChange}
                        name="email"
                        />
                    </div>
                    <div className="form-group">
                        
                        <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        placeholder="Password"
                        value={currentUserDetail.password}
                        onChange={handleInputChange}
                        name="password"
                        />
                    </div>
                    <button onClick={login} className="btn-success">
                        Submit
                    </button>
                </div>
                </div>
        )}
    </div>
   )

 }

export default LoginForm
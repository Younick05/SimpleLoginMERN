import React, { useState, useEffect } from "react";
import userDataService from "../../service/userService";
import "./style.css";
import {Redirect} from "react-router-dom";

const DashBoard = props => {
  const initialUserData = {
    name:"",
    email:"",
    password:"",
    cpassword:"",
    gender:""
  };
  const [currentUser, setCurrentUser] = useState(initialUserData);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  let loggedIn = true;
    if (token == null){
        loggedIn=false
    }

  const getUserData = id => {
    userDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserData(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUserData = () => {
    console.log(currentUser.cpassword, currentUser.password)
    const condition = (currentUser.cpassword===currentUser.password)
    
    if(!condition){
      setMessage("password does not match with cofirm password")
    }
    else{
      userDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("User Data was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const deleteUserData = () => {
    userDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('token');
        props.history.push("/user");
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const logOutUser = () => {
    localStorage.removeItem('token');
    props.history.push("/user");
  };

  return (
    <div className="dashboard-container">
      {!loggedIn ? 
      (<Redirect to="/login"/>) : 
      (<div>
        {currentUser ? (
        <div className="edit-form">
          <h4>User Data</h4>
          <form>
          <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentUser.name}
                onChange={handleInputChange}
                name="name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                type="email"
                className="form-control"
                id="email"
                required
                disabled
                value={currentUser.email}
                onChange={handleInputChange}
                name="email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                required
                value={currentUser.password}
                onChange={handleInputChange}
                name="password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">CrossPassword</label>
                <input
                type="password"
                className="form-control"
                id="cpassword"
                required
                value={currentUser.cpassword}
                onChange={handleInputChange}
                name="cpassword"
                />
            </div>

            <select className="ddl-box">
                <option class="dropdown-item" name="gender" value={currentUser.gender}
                onChange={handleInputChange}>Male</option>
                <option class="dropdown-item" name="gender" value={currentUser.gender}
                onChange={handleInputChange}>Female</option>
            </select>
          </form>

          <button className="btn-danger" onClick={deleteUserData}>
            Delete
          </button>

          <button
            type="submit"
            className="btn-success"
            onClick={updateUserData}
          >
            Update
          </button>
          
          <button
            type="submit"
            className="btn-success"
            onClick={logOutUser}
          >
            Logout
          </button>
          <br/>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please select user to edit the data...</p>
          <br/>
          <button
            type="submit"
            className="btn-success"
            onClick={logOutUser}
          >
            Logout
          </button>
        </div>
      )}
      </div>)}
    </div>
  );
};

export default DashBoard;
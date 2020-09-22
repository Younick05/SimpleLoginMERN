import React, {useState} from 'react';
import './style.css';
import UserDataService from '../../service/userService';


const UserForm = (props) => {

    const initialState = {
        name:"",
        email:"",
        password:"",
        cpassword:"",
        gender:""
    }

    const [userData, setUserData] = useState(initialState);

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveUserData = () => {
      
    var data = {
        name:userData.name,
        email:userData.email,
        password:userData.password,
        cpassword:userData.cpassword,
        gender:userData.gender
      };

    if (!data.password===data.cpassword) {
               console.log("password does not match with confirm password")
    } else {
      
          UserDataService.create(data)
            .then(response => {
              setUserData({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                password: response.data.password,
                cpassword: response.data.cpassword,
                gender: response.data.gender
              });
              setSubmitted(true);
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });   
    }
  };

  const newUser = () => {
    setUserData(initialState);
    setSubmitted(false);
  };


  return(
      <div className="form-container">
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>You submitted successfully!</h4>
            <button className="btn-success" onClick={newUser}>
                Add
            </button>
            </div>
        ) : (
            <div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                required
                value={userData.name}
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
                value={userData.email}
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
                value={userData.password}
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
                value={userData.cpassword}
                onChange={handleInputChange}
                name="cpassword"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Gender</label>
                <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={userData.gender}
                onChange={handleInputChange}
                name="gender"
                />
            </div>

            <button onClick={saveUserData} className="btn-success">
                Submit
            </button>
            </div>
        )}
        </div>
    </div>
   )

 }

export default UserForm
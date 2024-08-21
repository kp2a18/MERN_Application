/*import React, { useState } from 'react'
import {  Link,useNavigate } from 'react-router-dom'
export default function Login() {

  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate()
  const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
      const response= await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({email:credentials.email, password:credentials.password})
      });
      const json = await response.json()
      console.log(json);

      if(!json.success) {
          alert("Enter the valid Credential")
      }
      else{
       localStorage.setItem("authToken",json.authToken);
       console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      } 

  };

  const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  }

  return (
    <>
        <div className='container'>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to= "/createuser" className='m-3 btn btn-danger'> I am a new user</Link>
            </form>
            </div>
        </>
  )
}*/


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting credentials:', credentials);

      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();
      console.log('Response from server:', json);

      if (!json.success) {
        alert("Enter the valid Credential");
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log('Auth token set in local storage:', localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </>
  );
}


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let Navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email , password : credentials.password }),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            //Redirect and save auth token
            localStorage.setItem("token",json.authToken)
            localStorage.setItem("iNotebookName",json.name)
            Navigate('/')
          }else{
            alert("Please Enter Valid Credentials")
          }
        //   console.log(json);
    }

    const HnadleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value })
    }

  return (
    <>
    <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} onChange={HnadleChange} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={HnadleChange} name='password'/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Login

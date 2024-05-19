import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword : ""})
    let Navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(credentials.cpassword===credentials.password){

        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email , password : credentials.password }),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            // Redirect and save auth token
            localStorage.setItem("token",json.authToken)
            localStorage.setItem("iNotebookName",credentials.name)
            console.log('success')
            Navigate('/')
          }else{
            alert("Please Enter Valid Credentials")
          }
        }else{
            alert('Please enter same password')
        }

    }

    const HnadleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value })
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={HnadleChange} value={credentials.name} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email'onChange={HnadleChange}value={credentials.email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password'onChange={HnadleChange} value={credentials.password} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword'onChange={HnadleChange} value={credentials.cpassword} id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleclick = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
    }
    else {
      alert("Invalid credentials")
    }
    console.log(json)
  }
  const changef = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <div className="App">
      <form onSubmit={handleclick}>
        <div className="mb-4 p-2">
          <label htmlFor="name" className="form-label">Full name</label>
          <input type="text" onChange={changef} className="form-control" style={{ width: "500px", margin: "0 auto" }} id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-4 p-2">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={changef} className="form-control" style={{ width: "500px", margin: "0 auto" }} id="email" name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 p-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={changef} style={{ width: "500px", margin: "0 auto" }} className="form-control" id="password" name='password' />
        </div>
        <div className="mb-3 p-2">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" onChange={changef} style={{ width: "500px", margin: "0 auto" }} className="form-control" id="cpassword" name='cpassword' />
        </div>
        <button type="submit" className="btn btn-primary m-2">Signup</button>
      </form>
    </div>
  );
}

export default Signup
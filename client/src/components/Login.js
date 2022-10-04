import React,{useState,useEffect} from 'react'
import useData from '../hooks/useData';
import axios from '../api/axios';
import "../style.css";
import {useNavigate,useLocation} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import login1 from '../images/login1.png';
import Paper from "@mui/material/Paper";

const defaultLogin={
  userName:"",
  password:""
}

const Login = () => {
  const {setAuth,err,setErr}=useData();
  const [login,setLogin]=useState(defaultLogin);
  
  const navigate = useNavigate();
  const location = useLocation();
  const fromForAdmin = location.state?.from?.pathname || "/";
  const fromForPanel = location.state?.from?.pathname.includes('/interview/edit/')?location.state?.from?.pathname :"/interviewer";

  useEffect(() => {
    setErr('');
  }, [login,setErr])

  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!login.userName || !login.password){
      setErr('please provide both the both the fields');
      return;
    }
    
    try {
      const response = await axios.post('/user/login',
          JSON.stringify(login),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ role, accessToken });
      
      setLogin(defaultLogin);
      role==='admin'?navigate(fromForAdmin):navigate(fromForPanel);

    }catch (err) {
      if (!err?.response?.data) {
        setErr('No Server Response');
      } else if (err.response?.status === 400) {
        setErr(err.response.data.data);
      }else {
        setErr('Login Failed');
      }
    }
  }

  return (
  <>
    <Paper elevation={6} className="logIn-card">
      {err && <p style={{color:'red'}}>{err}</p>}
      <div
        className="fadeIn-first"
        style={{ float: "left", position: "absolute" }}
      >
        <h2
          style={{
            marginTop: "19%",
            marginLeft: "11%",
            fontFamily: "PT Serif",
            fontWeight: "bold",
            letterSpacing: "0.5rem",
            color: "#E4DCCF",
          }}
        >
          Interview Management
        </h2>

        <img
          src={login1}
          alt="login img"
          className="card-img-top"
        />
      </div>
      <div id="formContent" style={{ float: "right", margin: "5%" }}>
        <div className="fadeIn first">
          <img src={logo} id="icon" alt="User Icon" />
        </div>

        <form onSubmit={handleLogin}>
          <input
           required
            type="text"
            id="login"
            className="fadeIn second"
            value={login.userName}
            onChange={(e)=>setLogin({...login,userName:e.target.value})}
            name="userName"
            placeholder="login"
          />
          <input
           required
            type="password"
            id="password"
            value={login.password}
            onChange={(e) => setLogin({...login,password:e.target.value})}
            className="fadeIn third"
            name="password"
            placeholder="password"
          />

          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
          />
        </form>


      </div>
    </Paper>
  </>
  )
}

export default Login

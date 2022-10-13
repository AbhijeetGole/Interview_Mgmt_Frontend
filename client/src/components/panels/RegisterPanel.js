import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckIcon from "@mui/icons-material/Check";
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WorkIcon from '@mui/icons-material/Work';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosUserPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../../index.css';


const defaultCandidate = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: 0,
  location: "",
  skills: "",
  role: "",
  experience: 0
}

const rolls = [
  {
    value: 'hr',
    label: 'hr',
  },
  {
    value: 'tech',
    label: 'tech',
  },
  {
    value: 'admin',
    label: 'admin',
  },

];

export default function SimplePaper() {

  const [user, setUser] = useState(defaultCandidate)
  const [open, setOpen] = useState(false);
  const [open_phone_error, setOpen_phone_error] = useState(false);
  const [open_userName_duplicate, setOpen_userName_duplicate] = useState(false);
  const [open_confirmPassword_error, setOpen_confirmPassword_error] = useState(false);
  const [open_email_error, set_email_error] = useState(false);
  const [open_experience_error, set_exeperience_error] = useState(false);
  const [open_firstName_error, set_firstName_error] = useState(false);
  const [open_location_error, set_location_error] = useState(false);
  const [open_lastName_error, set_lastName_error] = useState(false);
  
  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClose_phoneError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_phone_error(false);
  }

  const handleClose_usernameDuplicate = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen_userName_duplicate(false);
  };

  const handleClose_confirmPassword_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen_confirmPassword_error(false);
  };

  const handleClose_email_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    set_email_error(false);
  };

  const handleClose_exeperience_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_exeperience_error(false);
  };
  const handleClose_firstName_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_firstName_error(false);
  };

  const handleClose_lastName_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_lastName_error(false);
  };

  const handleClose_location_error = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    set_location_error(false);
  };


  const registerPanalMember = async () => {
    try {
      if (!Array.isArray(user.skills)) {
        const skill = (user.skills).split(",");
        user.skills = skill;
      }
      const response = await axiosPrivate.post('/user', JSON.stringify(user));
      if (response?.data?.success) {
        navigate('/panel')
        setOpen(true);
      }
      else if (response.status === 209) {
        setOpen_userName_duplicate(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const hasNumber = /\d/;
    if (hasNumber.test(user.firstName)) {
      set_firstName_error(true);
    }
    else if (hasNumber.test(user.lastName)) {
      set_lastName_error(true);
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
      set_email_error(true)
    }
    else if (user.phone.length !== 10 || (isNaN(user.phone))) {
      setOpen_phone_error(true);
    }
    else if (user.confirmPassword !== user.password) {
      setOpen_confirmPassword_error(true);
    }
    else if (isNaN(user.experience)) {
      set_exeperience_error(true);
    }
    else if (hasNumber.test(user.location)) {
      set_location_error(true);
    }
    else {
      await registerPanalMember();
    }
  }

  const handleCancelClick = (e) => {
    setUser(defaultCandidate)
  }

  const handleNavigate =()=>{
    navigate("/panel");
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <IconButton style={{ marginRight: '80%' }} 
        onClick={handleNavigate}>
        <ArrowBackIcon sx={{ width: 30, height: 30 }} />
      </IconButton>
      <Paper elevation={8} style={{ marginLeft: "8%", marginRight: "8%" }}>
        <h2
          style={{
            backgroundColor: "#0AA1DD",
            textAlign: "center",
            color: "white",
          }}
        >
          Panel Registration Form
        </h2>
        <form onSubmit={handleClick}>
          <div className="flex-container">
            <div className="flex-item-left">
              <TextField
                id="firstName"
                label="FirstName"
                name="firstName"
                onChange={changeHandler}
                value={user.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="lastName"
                label="LastName"
                name="lastName"
                onChange={changeHandler}
                value={user.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-left">
              <TextField
                id="userName"
                label="UserName"
                name="userName"
                onChange={changeHandler}
                value={user.userName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="email"
                label="e-mail"
                name="email"
                onChange={changeHandler}
                value={user.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-left">
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={changeHandler}
                value={user.password}
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="confirmPassword"
                label=" Confirm Password"
                onChange={changeHandler}
                value={user.confirmPassword}
                name="confirmPassword"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CheckIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-left">
              <TextField
                id="phone"
                label="Mobile No"
                name="phone"
                onChange={changeHandler}
                value={user.phone}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="location"
                label="Location"
                name="location"
                onChange={changeHandler}
                value={user.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "80%"
                }}
                required
              />
            </div>
            <div className="flex-item-left">
              <TextField
                id="skills"
                label="Skills"
                name="skills"
                onChange={changeHandler}
                value={user.skills}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "80%",
                }}
                helperText="Seperate Skills by using comma(,)"
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="role"
                select
                label="Role"
                name="role"
                value={user.role}
                onChange={changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "80%",
                  marginTop: "2.5%"
                }}
                required>{rolls.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}</TextField>
            </div>
            <div className="flex-item-left">
              <TextField
                id="experience"
                label="Experience"
                name="experience"
                onChange={changeHandler}
                value={user.experience}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MilitaryTechIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  width: "40%"
                }}
                required
              />
            </div>
          </div>
          <div className="flex-container">
            <div className="flex-item-left" >
              <Button variant="contained" endIcon={<HowToRegIcon />} type="submit"
                style={{ width: "35%" }}>
                Register
              </Button>
              <Button className="flex-item-right" variant="contained" endIcon={<CancelIcon />} onClick={handleCancelClick}
                style={{ marginLeft: "20%", width: "35%" }}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Paper>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Panel Member Registered Successfully!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_phone_error} autoHideDuration={6000} onClose={handleClose_phoneError}>
          <Alert onClose={handleClose_phoneError} severity="error" sx={{ width: '100%' }}>
            Please Enter Valid Phone no!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_userName_duplicate} autoHideDuration={6000} onClose={handleClose_usernameDuplicate}>
          <Alert onClose={handleClose_usernameDuplicate} severity="error" sx={{ width: '100%' }}>
            This UserName is already taken!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_confirmPassword_error} autoHideDuration={6000} onClose={handleClose_confirmPassword_error}>
          <Alert onClose={handleClose_confirmPassword_error} severity="error" sx={{ width: '100%' }}>
            Please Confirm the password!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_email_error} autoHideDuration={6000} onClose={handleClose_email_error}>
          <Alert onClose={handleClose_email_error} severity="error" sx={{ width: '100%' }}>
            Please Enter Valid Email!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_experience_error} autoHideDuration={6000} onClose={handleClose_exeperience_error}>
          <Alert onClose={handleClose_exeperience_error} severity="error" sx={{ width: '100%' }}>
            Please Enter valid Experience!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_firstName_error} autoHideDuration={6000} onClose={handleClose_firstName_error}>
          <Alert onClose={handleClose_firstName_error} severity="error" sx={{ width: '100%' }}>
            Please Enter Valid First Name!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_lastName_error} autoHideDuration={6000} onClose={handleClose_lastName_error}>
          <Alert onClose={handleClose_lastName_error} severity="error" sx={{ width: '100%' }}>
            Please Enter valid last name!!!
          </Alert>
        </Snackbar>
        <Snackbar open={open_location_error} autoHideDuration={6000} onClose={handleClose_location_error}>
          <Alert onClose={handleClose_location_error} severity="error" sx={{ width: '100%' }}>
            Please Enter valid location!!!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

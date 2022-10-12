import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
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
import MenuItem from '@mui/material/MenuItem';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosUserPrivate } from "../../api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultCandidate = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open_phone_error, setOpen_phone_error] = useState(false);
  const [open_userName_duplicate, setOpen_userName_duplicate] = useState(false);
  const [open_confirmPassword_error, setOpen_confirmPassword_error] = useState(false);
  const [open_email_error, set_email_error] = useState(false);
  const [open_experience_error, set_exeperience_error] = useState(false);

  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/member");
        if (response?.data?.success) {
          const users = response.data.data;
          const currUser = users.find(user => user._id === id);
          if (!currUser) {
            navigate('/panel');
          } else {
            setConfirmPassword(currUser.password);
            isMounted && setUser(currUser);
            setUser((prev) => {
              return { ...prev, skills: currUser.skills.toString() }
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, navigate, location, id, setConfirmPassword]);

  const handleCancelClick = (e) => {
    navigate('/panel');
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

  const updatePanelMember = async (user, id) => {
    if (!Array.isArray(user.skills)) {
      const skill = (user.skills).split(",");
      user.skills = skill;
    }
    try {
      const response = await axiosPrivate.put(`/user/member/${id}`, JSON.stringify(user))
      if (response.data.success) {
        navigate('/panel');
        setOpen(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
      set_email_error(true)
    }
    else if (user.phone.toString().length !== 10) {
      setOpen_phone_error(true);
    }
    else if (isNaN(user.experience)) {
      set_exeperience_error(true);
    }
    else {
      await updatePanelMember(user, id);
    }
  }

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <IconButton style={{ marginRight: '80%' }}>
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
          Edit Panel Member
        </h2>
        <form onSubmit={handleClick}>
          <div className="flex-container">
            <div className="flex-item-left">
              <TextField
                id="input-with-icon-textfield"
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
                id="input-with-icon-textfield"
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
                id="input-with-icon-textfield"
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
                disabled
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="input-with-icon-textfield"
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
                id="input-with-icon-textfield"
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
                id="outlined-basic"
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
                id="outlined-basic"
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
                  width: "80%"
                }}
                helperText="Seperate Skills by using comma(,)"
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="outlined-select-currency"
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
                  width: "80%"

                }}
                required>{rolls.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}</TextField>
            </div>
            <div className="flex-item-left">
              <TextField
                id="outlined-basic"
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
                Update
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
            Panel Member Details Edited Successfully!!!
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
      </Stack>
    </>
  );
}

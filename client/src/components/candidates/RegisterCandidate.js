import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from '@mui/icons-material/School';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { axiosCanadidatePrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../index.css";

const defaultCandidate = {
  name: "",
  experience: 0,
  location: "",
  primarySkills: "",
  secondarySkills: "",
  qualification: "",
  noticePeriodInWeeks: 0,
  designation: "",
};

export default function RegisterCandidate() {
  const [candidate, setCandidate] = useState(defaultCandidate);
  const [open, setOpen] = useState(false);
  const [open_experience_error, set_exeperience_error] = useState(false);
  const [open_notice_error, set_notice_error] = useState(false);

  const axiosPrivate = useAxiosPrivate(axiosCanadidatePrivate);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClose_exeperience_error = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    set_exeperience_error(false);
  };
  const handleClose_notice_error = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    set_notice_error(false);
  };

  const registerCandidate = async () => {
    try {
      if (!Array.isArray(candidate.primarySkills)) {
        const primarySkill = candidate.primarySkills.split(",");
        candidate.primarySkills = primarySkill;
      } else if (!Array.isArray(candidate.secondarySkills)) {
        const secondarySkill = candidate.secondarySkills.split(",");
        candidate.secondarySkills = secondarySkill;
      }
      const response = await axiosPrivate.post(
        "/candidate",
        JSON.stringify(candidate)
      );
      if (response?.data?.success) {
        navigate("/candidate");
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isNaN(candidate.experience)) {
      set_exeperience_error(true);
    } else if (isNaN(candidate.noticePeriodInWeeks)) {
      set_notice_error(true);
    } else {
      await registerCandidate();
    }
  };

  const handleCancelClick = (e) => {
    setCandidate(defaultCandidate);
  };

  const handleNavigate =()=>{
    navigate("/candidate");
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>

      <IconButton
        style={{ marginRight: "80%" }}
        onClick={handleNavigate}
      >
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
          Candidate Registration Form
        </h2>
        <form onSubmit={handleClick}>
          <div className="flex-container">
            <div className="flex-item-left">
              <TextField
                id="name"
                label="Name"
                name="name"
                onChange={changeHandler}
                value={candidate.name}
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
                id="location"
                label="Location"
                name="location"
                onChange={changeHandler}
                value={candidate.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
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
                id="designation"
                label="designation"
                name="designation"
                onChange={changeHandler}
                value={candidate.designation}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
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
                id="qualification"
                label="Qualification"
                name="qualification"
                onChange={changeHandler}
                value={candidate.qualification}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
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
                id="experience"
                label="Experience"
                name="experience"
                onChange={changeHandler}
                value={candidate.experience}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
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
                id="noticePeriodInWeeks"
                label="Notice Period(in weeks)"
                name="noticePeriodInWeeks"
                onChange={changeHandler}
                value={candidate.noticePeriodInWeeks}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon  />
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
                id="primarySkills"
                label="Primary Skills"
                onChange={changeHandler}
                value={candidate.primarySkills}
                name="primarySkills"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
                helperText="Seperate Skills by using comma(,)"
              />
            </div>
            <div className="flex-item-right">
              <TextField
                id="secondarySkills"
                label=" Secondary Skills"
                onChange={changeHandler}
                value={candidate.secondarySkills}
                name="secondarySkills"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ width: "80%" }}
                required
                helperText="Seperate Skills by using comma(,)"
              />
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-item-left">
              <Button
                variant="contained"
                endIcon={<HowToRegIcon />}
                type="submit"
                style={{ width: "35%" }}
              >
                Register
              </Button>
              <Button
                className="flex-item-right"
                variant="contained"
                endIcon={<CancelIcon />}
                onClick={handleCancelClick}
                style={{ marginLeft: "20%", width: "35%" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Paper>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Panel Member Registered Successfully!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open_experience_error}
          autoHideDuration={6000}
          onClose={handleClose_exeperience_error}
        >
          <Alert
            onClose={handleClose_exeperience_error}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please Enter valid Experience!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open_notice_error}
          autoHideDuration={6000}
          onClose={handleClose_notice_error}
        >
          <Alert
            onClose={handleClose_notice_error}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please Enter valid Notice Period!!!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

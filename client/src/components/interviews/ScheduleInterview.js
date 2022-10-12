import React, { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import {
  axiosInterviewPrivate,
  axiosCanadidatePrivate,
  axiosUserPrivate,
} from "../../api/axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Autocomplete from "@mui/material/Autocomplete";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DateTimePicker from "react-datetime-picker";

const ScheduleInterview = () => {
  const { candidates, setCandidates, err, setErr, users, setUsers } = useData();
  const [datevalue, setDateValue] = React.useState(
    dayjs("2022-10-01T00:00:00.000Z")
  );
  const [flag, setFlag] = React.useState(true);
  const [value, setValue] = useState("");
  const [allValues, setAllValues] = useState({
    candidateId: 0,
    techId: 0,
    hrId: 0,
    techRating: -1,
    techComments: " ",
    hrRating: -1,
    hrComments: "",
    startTime: datevalue.$d,
  });
  const [tech, setTech] = React.useState([]);
  const [hr, setHr] = React.useState([]);

  const axiosInterview = useAxiosPrivate(axiosInterviewPrivate);
  const axiosCandidate = useAxiosPrivate(axiosCanadidatePrivate);
  const axiosUser = useAxiosPrivate(axiosUserPrivate);

  const navigate = useNavigate();
  const location = useLocation();

  const handleValue = (e, value) => {
    console.log("value", value);
    users.map((user, idx) => {
      if (user.userName === value && user.role === "tech") {
        setAllValues({ ...allValues, techId: user._id });
      } else if (user.userName === value && user.role === "hr") {
        setAllValues({ ...allValues, hrId: user._id });
      }
    });
  };

  const handleCandidate = (e, value) => {
    candidates.map((candidate) => {
      if (candidate.name === value) {
        setAllValues({ ...allValues, candidateId: candidate._id });
      }
    });
  };
  useEffect(() => {
    let isMounted = true;
    const getAllCandidate = async () => {
      try {
        const response = await axiosCandidate.get("/candidate");
        if (response?.data?.success) {
          isMounted && setCandidates(response?.data?.data);
          console.log(response.data.data);
        }
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getAllCandidate();

    const getUsers = async () => {
      try {
        const response = await axiosUser.get("/user/member");
        if (response?.data?.success) {
          isMounted && setUsers(response?.data?.data);
          const currUsers = response?.data?.data;
          console.log(currUsers);
          setHr(currUsers.filter((currUser) => currUser.role == "hr"));
          setTech(currUsers.filter((currUser) => currUser.role == "tech"));
        }
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();

    return () => {
      isMounted = false;
    };
  }, [axiosUser, axiosInterview, setCandidates, navigate, location, flag]);

  const newInterview = async () => {
    setAllValues((prev) => {
      return { ...prev, startTime: datevalue };
    });
    const currInterview = { ...allValues, startTime: datevalue };
    console.log(currInterview);
    try {
      const response = await axiosInterview.post(
        "/interview",
        JSON.stringify(currInterview)
      );

      if (response?.data?.success) {
        navigate("/interview");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    newInterview();
  };
  const handleRoute = () => {
    navigate("/interview");
  };
  return (
    <>
      <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
        Schedule Interview
      </h3>
      <div style={{ marginLeft: "15%" }}>
        <Tooltip title="Back">
          <IconButton onClick={handleRoute}>
            <ArrowBackIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Tooltip>
      </div>
      <Autocomplete
        style={{ width: "50%", marginLeft: "18%", marginTop: "3%" }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={candidates.map((option) => `${option.name}`)}
        onChange={handleCandidate}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Select Candidate"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <Autocomplete
        style={{ width: "50%", marginLeft: "18%", marginTop: "3%" }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={tech.map((tec) => tec.userName)}
        onChange={handleValue}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Select Technical Member"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <Autocomplete
        style={{ width: "50%", marginLeft: "18%", marginTop: "3%" }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={hr.map((member) => member.userName)}
        onChange={handleValue}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Select Hr Member"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <div style={{ marginTop: "5%", width: "50%", marginLeft: "21%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="date"
            name="startTime"
            label="Date and Time"
            value={datevalue}
            renderInput={(params) => <TextField {...params} required />}
            onChange={(newValue) => {
              console.log(newValue.$d.toString().split("GMT")[0]);
              setDateValue(newValue.$d.toString().split("GMT")[0]);
            }}
          />
        </LocalizationProvider>
      </div>
      <Button
        style={{
          width: "25%",
          margin: "5% 2% 5% 39%",
        }}
        variant="contained"
        type="submit"
        onClick={handleClick}
        endIcon={<AccessTimeFilledIcon />}
      >
        Schedule Interview
      </Button>
    </>
  );
};

export default ScheduleInterview;

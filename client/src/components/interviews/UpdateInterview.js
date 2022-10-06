import React, { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Slider from "@mui/material/Slider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  axiosInterviewPrivate,
  axiosCanadidatePrivate,
  axiosUserPrivate,
} from "../../api/axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UpdateInterview = () => {
  const { auth, setCandidates, users, setUsers } = useData();

  const location = useLocation();
  const [flag, setFlag] = React.useState(true);
  const [datevalue, setDateValue] = React.useState(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [hrName, setHrName] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [interview, setInterview] = useState({
    candidateId: 0,
    techId: 0,
    hrId: 0,
    techRating: -1,
    techComments: " ",
    hrRating: -1,
    hrComments: "",
    startTime: datevalue.$d,
    status: "",
  });

  console.log("all", interview);

  const axiosInterview = useAxiosPrivate(axiosInterviewPrivate);
  const axiosCandidate = useAxiosPrivate(axiosCanadidatePrivate);
  const axiosUser = useAxiosPrivate(axiosUserPrivate);

  const handleStatus = (e) => {
    setInterview({ ...interview, status: e.target.value });
  };

  const handleValue = (e, value) => {
    console.log("value", value);
    users.map((user, idx) => {
      if (user.userName === value && user.role === "tech") {
        setInterview({ ...interview, techId: user._id });
      } else if (user.userName === value && user.role === "hr") {
        setInterview({ ...interview, hrId: user._id });
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
        console.log(error);
      }
    };
    getAllCandidate();

    const getUsers = async () => {
      try {
        const response = await axiosUser.get("/user/member");
        if (response?.data?.success) {
          isMounted && setUsers(response?.data?.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();

    const getInterviews = async () => {
      try {
        const response = await axiosInterview.get("/interview");
        const Interview = response.data.data;
        const currUser = Interview.find((user) => user._id == id);
        if (!currUser) {
          navigate("/interview");
        } else {
          console.log(currUser);
          isMounted && setInterview(currUser);
          console.log("curr", currUser);
        }

        const getName = () => {
          const name = users.find((user) => user._id == interview.hrId);
          setHrName(name);
        };

        getName();
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getInterviews();

    return () => {
      isMounted = false;
    };
  }, [axiosUser, axiosInterview, setCandidates, navigate, location, flag]);

  const updateInterview = async () => {
    console.log(datevalue);
    setInterview((prev) => {
      return { ...prev, startTime: datevalue };
    });
    try {
      const response = await axiosInterviewPrivate.put(
        `/interview/${id}`,
        JSON.stringify(interview)
      );
      console.log(response.data.data);
      if (response.data.success) {
        navigate("/interview");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleRoute = () => {
    if (auth?.role === "admin") {
      navigate("/interview");
    } else {
      navigate("/interviewer");
    }
  };

  const handleClick = () => {
    updateInterview();
  };

  return (
    <>
      <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
        Update Interview
      </h3>

      <div style={{ marginLeft: "15%" }}>
        <Tooltip title="Back">
          <IconButton onClick={handleRoute}>
            <ArrowBackIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Tooltip>
      </div>
      {auth?.role === "admin" ? (
        <>
          <Autocomplete
            style={{ width: "50%", marginLeft: "15%", marginTop: "3%" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={users.map((option) =>
              option.role === "tech" ? `${option.userName}` : ""
            )}
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
            style={{ width: "50%", marginLeft: "15%", marginTop: "3%" }}
            freeSolo
            value={hrName}
            id="free-solo-2-demo"
            disableClearable
            options={users.map((option) =>
              option.role === "hr" ? `${option.userName}` : ""
            )}
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
          <FormControl
            style={{ width: "50%", marginLeft: "15%", marginTop: "3%" }}
          >
            <InputLabel id="demo-simple-select-label">status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={interview.status}
              label="status"
              name="status"
              onChange={handleStatus}
              required
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="selected">Selected</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: "5%", width: "50%", marginLeft: "19%" }}>
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
        </>
      ) : auth?.role === "hr" ? (
        <>
          <label style={{ marginLeft: "25%", marginTop: "2%" }}>
            Hr Rating
          </label>
          <Slider
            aria-label="Hr Rating"
            defaultValue={5}
            style={{ width: "60%", marginLeft: "25%" }}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(e) =>
              setInterview({ ...interview, hrRating: e.target.value })
            }
          />
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Hr Comments"
            style={{ width: 500, height: 100, marginLeft: "25%" }}
            onChange={(e) =>
              setInterview({ ...interview, hrComments: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <label style={{ marginLeft: "25%" }}>Tech Rating</label>
          <Slider
            aria-label="Tech Rating"
            defaultValue={5}
            style={{ width: "60%", marginLeft: "25%" }}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(e) =>
              setInterview({ ...interview, techRating: e.target.value })
            }
          />
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Tech Comments"
            style={{ width: 500, height: 100, marginLeft: "25%" }}
            onChange={(e) =>
              setInterview({ ...interview, techComments: e.target.value })
            }
          />
        </>
      )}

      <Button
        style={{ width: "25%", margin: "5% 2% 5% 39%" }}
        variant="contained"
        endIcon={<AccessTimeFilledIcon />}
        onClick={handleClick}
      >
        Update Interview
      </Button>
    </>
  );
};

export default UpdateInterview;

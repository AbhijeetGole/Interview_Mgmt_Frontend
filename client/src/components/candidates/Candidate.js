import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Container, IconButton} from "@mui/material";
import { useNavigate, Link,useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import useData from "../../hooks/useData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosCanadidatePrivate } from "../../api/axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Modal,Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";



const Candidate = () => {
  const { candidates, setCandidates } = useData();
  
  const location = useLocation();
  const [flag,setFlag]=React.useState(true);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate(axiosCanadidatePrivate);
  const [searchResults, setSearchResults] = React.useState([]);
const [candidate,setCandidate] = useState([])
const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(true);

const handleClose = () => setOpen(false);

  const handleClick = () => {
    navigate("/candidate/register");
  };

 
  useEffect(() => {
    let isMounted = true;
    const getAllCandidate = async () => {
      try {
        const response = await axiosPrivate.get(
          "/candidate"
        );
        if (response?.data?.success) {
          isMounted &&setCandidates(response.data.data)
          setSearchResults(response?.data?.data)
          
          console.log(response.data.data);
        }
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getAllCandidate();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setCandidates, navigate, location,flag]);
  const style = {
    position: "absolute",
  
    top: "50%",
  
    left: "50%",
  
    transform: "translate(-50%, -50%)",
  
    width: 400,
  
    bgcolor: "background.paper",
  
  
    boxShadow: 24,
  
    p: 4,
  };

  const getCandidate = async (id) => {
    try {
      const response = await axiosPrivate.get(
        "/candidate"
      );
      if (response?.data?.success) {
        const candidate = response.data.data;
        const currUser = candidate.find((user) => user._id == id);
        if (!currUser) {
          navigate("/candidate");
        } else {
          console.log(currUser);
        setCandidate(currUser);
        setOpen(true)
        }
      }
    } catch (error) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };


  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(candidates);
    const resultsArray = candidates.filter(
      (candidate) =>
        candidate.name
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        candidate.primarySkills
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setSearchResults(resultsArray);
  };
  const ListPage = ({ searchResults }) => {
    console.log("searchResult",searchResults)

    const result = searchResults.map((result) => result);
    if (result?.length) {
      const content = result.map((result) => result);
      return <main>{content}</main>;
    } else {
      return (
        <article>
          <p>No Matching name</p>
        </article>
      );
    }
  };

  return (
   <>
      {ListPage}
      <h3
        style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}
      >
        Candidate List
      </h3>
      <Box id="box">
        <Button
          variant="contained"
          id="btn"
          endIcon={<AddCircleRoundedIcon />}
          onClick={handleClick}
        >
          Add Candidate
        </Button>
        <TextField
          id="search"
          label="Search"
          type="text"
          name="Search"
          placeholder="search by name or skills"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment id="magni" position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
      </Box>
    <Container maxWidth='lg'>

      <TableContainer  elevation={12} component={Paper} sx={{marginLeft:'3%',marginTop:'1%'}}>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="simple table"
        >
          <TableHead >
            <TableRow style={{ backgroundColor: "#EEEEEE" }}>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Primary Skills</TableCell>
              <TableCell align="left">Total Experience</TableCell>
              <TableCell align="left">Education</TableCell>
              <TableCell align="left">Designation</TableCell>
              <TableCell align="left">Notice Period</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">View Details</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((row, idx) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{idx + 1}</TableCell>

                <TableCell align="left" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.primarySkills + " "}</TableCell>
                <TableCell align="center">{row.experience}</TableCell>
                <TableCell align="left">{row.qualification}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="center">{row.noticePeriodInWeeks}</TableCell>
                <TableCell align="left">
                  <Link to={`/candidate/edit/${row._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: "rgb(70 67 229 / 54%)" }} />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="View Candidate Details">
                      <IconButton 
                        onClick={() => getCandidate(row._id)}
                      >
                        <VisibilityIcon style={{  padding: "0" }}/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" align="center">
            {candidate.name}'s Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{fontWeight:'bold'}}> Name: </span> {candidate.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Primary Skills: </span>{candidate.primarySkills+','}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Secondary Skills:</span> {candidate.secondarySkills+','}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Experience:</span> {candidate.experience}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Qualification:</span> {candidate.qualification}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}>Designation: </span>{candidate.designation}
            </Typography>
            <Typography color="text.secondary">
            <span style={{fontWeight:'bold'}}>Notice Period:</span> {candidate.noticePeriodInWeeks}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ marginLeft: "90%" }}
              onClick={handleClose}
              size="small"
            >
              Close
            </Button>
          </CardActions>
        </Box>
      </Modal>

     
</>
  );
};

export default Candidate;

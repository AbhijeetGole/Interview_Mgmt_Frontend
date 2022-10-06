import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosInterviewPrivate } from "../../api/axios";
import useData from "../../hooks/useData";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";


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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Interview = () => {
  const { interviews, setInterviews } = useData();

  const axiosPrivate = useAxiosPrivate(axiosInterviewPrivate);
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState([])
  const [searchResults, setSearchResults] =useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const getInterviews = async () => {
      try {
        const response = await axiosPrivate.get(
          "/interview"
        );
        if (response?.data?.success) {
          isMounted && setInterviews(response?.data?.data);
          setSearchResults(response?.data?.data)
        }
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getInterviews();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setInterviews, navigate, location]);

  
  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    navigate("/interview/schedule");
  };

  const getUser= async (id) => {
    try {
      const response = await axiosPrivate.get(
        "/interview"
      );
      if (response?.data?.success) {
        const interview = response.data.data;
        const currUser = interview.find((user) => user._id == id);
        if (!currUser) {
          navigate("/user");
        } else {
          console.log(currUser);
        setUser(currUser);
        setOpen(true)
        }
      }
    } catch (error) {
      // navigate("/login", { state: { from: location }, replace: true });
      console.log(error)
    }
  };


  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(interviews);
    const resultsArray = interviews.filter(
      (interview) =>
        interview.name
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
       <Typography
        style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}
      >
      Interview List
      </Typography>
      <Box id="box">

      <Button
        onClick={handleClick}
        id="btn"
        variant="contained"
        endIcon={<AccessTimeFilledIcon />}
      >
        Schedule Interview
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
      <Container maxWidth='lg' style={{marginLeft:'7%',marginTop:'1%'}}>

      <TableContainer elevation={10} component={Paper}>
        <Table
          sx={{ minWidth: 650}}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: "#EEEEEE" }}>

                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Tech Rating</TableCell>
                <TableCell align="center">Tech Comments</TableCell>
                <TableCell align="center">HR Rating</TableCell>
                <TableCell align="center">HR Comments</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="center">View Details</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((interview) => (
                <TableRow key={interview._id}>
                  
                 
                 
                  <TableCell align="right">{interview.name}</TableCell>
                  <TableCell align="right">{interview.status}</TableCell>
                  <TableCell align="right">{interview.techRating===-1?"No Ratings given":interview.techRating}</TableCell>
                  <TableCell align="right">{interview.techComments===""?"No Comments":interview.techComments}</TableCell>
                  <TableCell align="right">{interview.hrRating===-1?"No Ratings given":interview.hrRating}</TableCell>
                  <TableCell align="right">{interview.hrComments===""?"No Comments":interview.hrComments}</TableCell>
                  <TableCell align="right">{interview.startTime}</TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Link
                      to={`/interview/edit/${interview._id}`}
                    >
                      <IconButton>
                      <EditIcon style={{ color: "rgb(70 67 229 / 54%)" }} />
                    </IconButton>                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View user Details">
                      <IconButton 
                        onClick={() => getUser(interview._id)}
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
            {user.name}'s Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
            <span style={{fontWeight:'bold'}}> Name: </span> {user.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Status: </span>{user.status}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Hr Rating:</span> {user.hrRating === -1?"No Ratings Given":user.hrRating}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}> Hr Comments:</span> {user.hrComments ===""?"No Comments":user.hrComments}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
            <span style={{fontWeight:'bold'}}>Tech Rating: </span>{user.techRating === -1?"No Ratings Given":user.techRating}
            </Typography>
            <Typography color="text.secondary">
            <span style={{fontWeight:'bold'}}>Tech Comments:</span> {user.techComments === ""?"No Comments":user.techComments}
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

export default Interview;


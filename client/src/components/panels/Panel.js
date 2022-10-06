import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "../../index.css";
import { Container } from "@mui/system";
import useData from "../../hooks/useData";
import { axiosUserPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const Panel = () => {
  const { users, setUsers } = useData();
  const [searchResults, setSearchResults] = React.useState([]);
  const [flag, setFlag] = React.useState(true);
  const [panel, setpanel] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/member");
        if (response?.data?.success) {
          isMounted && setUsers(response?.data?.data);
          setSearchResults(response?.data?.data);
          console.log(response.data.data);
        }
      } catch (error) {
        // navigate("/login", { state: { from: location }, replace: true });
        console.log(error)
      }
    };

    getUsers();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, setUsers, navigate, location, flag]);

  const deletePanelMember = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/user/member/${id}`);
      if (response?.data?.success) {
        setFlag((prev) => !prev);
        handleModalClose();

        return response.data;
      }

      const data = response.data.data;

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(users);

    const resultsArray = users.filter(
      (user) =>
        user.userName
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        user.skills
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setSearchResults(resultsArray);
  };
  const ListPage = ({ searchResults }) => {
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
  const getPanelDetails = async (id) => {
    try {
      const currUser = users.find((user) => user._id === id);

      setpanel(currUser);

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavigate = () => {
    navigate("/panel/register");
  };
  
  console.log("panel", panel);
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

  return (
    <>
      {ListPage}
      <h3 style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}>
        Panel List
      </h3>

      <Box id="box">
        <Button
          variant="contained"
          id="btn"
          endIcon={<AddCircleRoundedIcon />}
          onClick={handleNavigate}
        >
          Add Panel
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
      <Container id="container" style={{ maxWidth: "lg", marginTop: "10px" }}>
        <Paper elevation={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
              style={{ marginTop: "10px" }}
            >
              <TableHead style={{ backgroundColor: "#EEEEEE" }}>
                <TableRow>
                  <TableCell>Employee Name</TableCell>

                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Action</TableCell>
                  <TableCell align="right">View Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((user) => (
                  <TableRow
                    className="table"
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="User">
                      <a>{user.userName}</a>
                    </TableCell>

                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right" className="Userrole">
                      {user.role}
                    </TableCell>
                    <TableCell align="right">{user.location}</TableCell>

                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => navigate(`/panel/edit/${user._id}`)}
                      >
                        <EditIcon
                          style={{
                            color: "rgb(70 67 229 / 54%)",
                            padding: "0",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={handleModalOpen}
                      >
                        <DeleteIcon style={{ color: "red", padding: "0" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View panel Details">
                        <IconButton onClick={() => getPanelDetails(user._id)}>
                          <VisibilityIcon style={{ padding: "0" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <Modal
                      open={modalOpen}
                      onClose={handleModalOpen}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are You Sure ?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Do you really want to Delete {user.userName} ?
                        </Typography>
                        <Button
                          startIcon={<DeleteIcon />}
                          style={{ color: "red" }}
                          onClick={()=>deletePanelMember(user._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          startIcon={<CancelIcon />}
                          onClick={handleModalClose}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Modal>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            {panel.firstName}'s Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
              FirstName: {panel.firstName}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
              LastName: {panel.lastName}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Skills: {panel.skills + " "}
            </Typography>

            <Typography sx={{ mb: 1 }} color="text.secondary">
              Experience: {panel.experience}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Location: {panel.location}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Designation: {panel.role}
            </Typography>
            <Typography color="text.secondary">
              Notice Period: {panel.phone}
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

export default Panel;

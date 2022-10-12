import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
} from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { axiosInterviewPrivate, axiosCanadidatePrivate } from "../api/axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography, Container } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, Modal } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "@mui/material/CardActions";

import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";

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
const Interviewer = () => {
  const [interview, setInterview] = React.useState([]);
  const axiosPrivate = useAxiosPrivate(axiosInterviewPrivate);
  const axiosCandidate = useAxiosPrivate(axiosCanadidatePrivate);
  const [open, setOpen] = React.useState(false);
  const [candidate, setCandidate] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getAllInterviews = async () => {
      try {
        const response = await axiosPrivate.get("/interview");
        console.log(response.data);
        setInterview(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllInterviews();
  }, [setInterview, axiosPrivate]);
  const getCandidateDetails = async (id) => {
    try {
      const response = await axiosCandidate.get(`/candidate/${id}`);

      console.log(response.data);

      setCandidate(response.data.data);

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          style={{ color: "#2C3333", fontSize: "25Px", textAlign: "center" }}
        >
          Interview List
        </Typography>

        <TableContainer
          elevation={10}
          component={Paper}
          sx={{ marginLeft: "3%", marginTop: "2%" }}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#EEEEEE" }}>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Hr Rating</TableCell>
                <TableCell align="left">Tech Rating</TableCell>
                <TableCell align="left">status</TableCell>
                <TableCell align="left">Start Time</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">View Candidate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interview.map((row, idx) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{idx + 1}</TableCell>

                  <TableCell align="left" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    {row.hrRating === -1 ? "No Ratings" : row.hrRating}
                  </TableCell>
                  <TableCell align="left">
                    {row.techRating === -1 ? "No Ratings" : row.techRating}
                  </TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.startTime}</TableCell>
                  <TableCell align="left">
                    <Link to={`/interview/edit/${row._id}`}>
                      <IconButton>
                        <EditIcon style={{ color: "rgb(70 67 229 / 54%)" }} />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Candidate Details">
                      <IconButton
                        onClick={() => getCandidateDetails(row.candidateId)}
                      >
                        <VisibilityIcon />
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
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            Candidate Details
          </Typography>
          <CardContent>
            <Typography sx={{ mb: 1 }} color="text.secondary" gutterBottom>
              <span style={{ fontWeight: "bold" }}>Name : </span>
              {candidate.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Primary Skills : </span>{" "}
              {candidate.primarySkills + ", "}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Secondary Skills : </span>{" "}
              {candidate.secondarySkills + ", "}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Experience : </span>{" "}
              {candidate.experience}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Qualification : </span>{" "}
              {candidate.qualification}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Designation : </span>{" "}
              {candidate.designation}
            </Typography>
            <Typography color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Notice Period : </span>{" "}
              {candidate.noticePeriod}
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

export default Interviewer;
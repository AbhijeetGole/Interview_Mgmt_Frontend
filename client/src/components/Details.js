import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../images/new.png";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { axiosUserPrivate } from "../api/axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BasicModal(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const getNewUser = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        console.log(response.data);
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUser();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    <div>
      <IconButton onClick={handleOpen}>
        <Avatar
          sx={{ fontSize: 25, bgcolor: "#2E3AA2" }}
          alt={user.firstName}
          src="/static/images/avatar/1.jpg"
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card elevation={8} sx={style}>
          <CardMedia
            component="img"
            height="194"
            image={logo}
            alt="Paella dish"
          />
          <Avatar
            sx={{
              fontSize: 50,
              width: 86,
              height: 86,
              marginLeft: "40%",
              marginTop: "-15%",
              bgcolor: "#2E3AA2",
            }}
            aria-label="recipe"
            alt={user.firstName}
            src="/static/images/avatar/1.jpg"
          />
          <CardContent>
            <h4>{user.firstName + " " + user.lastName}</h4>
            <Typography variant="body2" color="text.secondary">
              {user._id}
            </Typography>
            <Typography>{user.role}</Typography>
          </CardContent>

          <Typography paragraph>skills : {user.skills + " "}</Typography>
          <div>
            <Typography paragraph>Email: {user.email}</Typography>
          </div>

          <Typography>Phone : {user.phone}</Typography>
        </Card>
      </Modal>
    </div>
  );
}

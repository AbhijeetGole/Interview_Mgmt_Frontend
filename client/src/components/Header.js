import React from "react";
import useData from "../hooks/useData";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BasicModal from "./Details";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DashboardIcon from "@mui/icons-material/Dashboard";
import zenLogo from "../images/images.jpg";
import { axiosUserPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ReactSwitch from "react-switch";
import { Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// const toggleTheme = () => {
//   setTheme((curr) => (curr === "light" ? "dark" : "light"));
// };

const Header = () => {
  const { auth, setAuth } = useData();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(true);
  const [user, setUser] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const axiosPrivate = useAxiosPrivate(axiosUserPrivate);
  const navigate = useNavigate();

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const surrenderAsPanelMember = async () => {
    try {
      const response = await axiosPrivate.delete("/user/member/surrender");
      if (response?.data?.success) {
        console.log(response.data.data);
        setFlag((prev) => !prev);
      }
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDelete = async () => {
    surrenderAsPanelMember();
    handleModalClose();
  };

  const handleLogOut =async () => {
    try{
      const response=await axiosPrivate.get('/user/logout');
      setAuth({});
      navigate("/login");
    }catch(err){
      console.log(err.message);
    }
   
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
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              <img
                src={zenLogo}
                style={{ maxWidth: "45px", maxHeight: "45px" }}
              />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              INTERVIEW MANAGEMENT
            </Typography>
            <div className="header">
              {" "}
              <BasicModal />
            </div>

            <h5 style={{ color: "white" }}>Hi,{user.userName}</h5>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {auth?.role === "admin" ? (
            <List>
              <Link to="/">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="DashBoard">
                        <DashboardIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="DashBoard"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/panel">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title=" Panel Management">
                        <SupervisedUserCircleIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Panel Management"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/candidate">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Manage Candidate">
                        <PersonIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Manage Candidate"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/interview">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Interview Management">
                        <Diversity3Icon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Interview Management"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/login">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Log Out">
                        <IconButton onClick={handleLogOut}>
                          <LogoutIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Log Out"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          ) : (
            <List>
              <Link to="/interviewer">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Home">
                        <HomeIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Log Out"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip title="Surrender">
                      <IconButton onClick={handleModalOpen}>
                        <PersonRemoveIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText
                    primary="Surrender"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <Link to="/login">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Log Out">
                        <LogoutIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Log Out"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          )}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you really want to surrender?
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            style={{ color: "red" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button startIcon={<CancelIcon />} onClick={handleModalClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Header;

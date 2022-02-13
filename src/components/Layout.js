import { useState, useEffect } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#ececec",
    },
    toolbar: theme.mixins.toolbar,
    linkText: {
      textDecoration: "none",
    },
    active: {
      background: "#f4f4f4",
    },
  };
});

function Layout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const [locs, setLocs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/trips").then((result) => {
      setLocs(result.data.trips);
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar>
          <p>
            Today is{" "}
            {new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}
          </p>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <h4 className={classes.title}> Climbing Locations</h4>
        </div>

        <List>
          <Link
          to='/'
          className={classes.linkText}>
            <ListItem
            button
            className={location.pathname === '/'? classes.active: null}>
              <ListItemText primary="Home"/>
            </ListItem>
          </Link>
          {locs.length > 0
            ? locs.map((loc) => {
                return (
                  <Link
                    key={loc.id}
                    to={`/loc/${loc.name}`}
                    className={classes.linkText}
                  >
                    <ListItem
                      button
                      className={
                        location.pathname.split("/")[2] === loc.name
                          ? classes.active
                          : null
                      }
                    >
                      <ListItemText primary={loc.name.toUpperCase()} />
                    </ListItem>
                  </Link>
                );
              })
            : ""}
        </List>
      </Drawer>

      {/* main contents */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;

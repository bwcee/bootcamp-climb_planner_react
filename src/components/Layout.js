import { useState, useEffect } from "react";
import {
  AppBar,
  Drawer,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import axios from "axios";
import DrawerList from "./DrawerList";

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
  };
});


function Layout({ children }) {
  const classes = useStyles();
  const [locs, setLocs] = useState([]);
 
   useEffect(() => {
    axios.get("http://localhost:3004/trips").then((result) => {
      const locsArr = result.data.trips;
      locsArr.sort((a, b) => {
        let locA = a.name.toLowerCase();
        let locB = b.name.toLowerCase();
        if (locA < locB) return -1;
        if (locA > locB) return 1;
        return 0;
      });
      setLocs(locsArr);
    });
  }, []);

  console.log("This is locs",locs)

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
          <DrawerList locs={locs}/>
        </Drawer>

        {/* main contents */}
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </div>
  );
}

export default Layout

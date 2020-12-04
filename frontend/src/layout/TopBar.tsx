import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

interface TopBarProps{
  onMobileNavOpen : Function,
}
const TopBar:React.FC<TopBarProps> = ({
  onMobileNavOpen,
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar
      elevation={0}
    >
      <Toolbar>
        <a href="#">
          <img
              src="https://img.icons8.com/metro/100/000000/avengers.png"
              alt="Avengers"
            />
        </a>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={()=>{
              onMobileNavOpen();
            }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};


export default TopBar;

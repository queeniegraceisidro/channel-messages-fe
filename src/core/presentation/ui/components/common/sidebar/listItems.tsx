import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Joined Channels
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Sample Channel" />
    </ListItemButton>
  </React.Fragment>
);
import React from 'react';
import { useScrollTrigger, Slide, AppBar, Toolbar, Typography } from '@material-ui/core';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function HaderHideOnScroll(props) {
  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Test chat</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default HaderHideOnScroll;


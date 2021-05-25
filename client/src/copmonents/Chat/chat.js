import React, { useEffect, useRef  } from 'react';
import moment from 'moment';
import { Toolbar, Typography, CssBaseline, Paper, Button, TextField,
        List, ListItem, ListItemAvatar, ListItemText, ListSubheader,
        Avatar  } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import HaderHideOnScroll from '../HideOnScroll';
import ScrollTop from '../ScrollTop';
import { makeStyles } from '@material-ui/core/styles';
import styles from './index.module.scss';


const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
      backgroundColor: 'white', 
      boxShadow: 'none'
    },
    button: {
      margin: theme.spacing(1),
      marginBottom: '10px'
    }, 
    newUser: {
      color: '#3f51b5',
      textAlign: 'center'
    }, 
}));


function Chat({messages, myName, value, setValue, sendMessage, setDisabled, disabled}) {
  const classes = useStyles();

  const messageRef = useRef();

  const time =  moment().format('HH:mm');

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
    }
  })

  function onChangeTextFiel(e) {
    const value = e.target.value;
    setValue(value);
    value.replace(/\s+/g, '').length > 0 ? setDisabled(false) : setDisabled(true);
  }

  function onKeyDownTextField(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      if (e.target.value.replace(/\s+/g, '').length > 0) {
        sendMessage();
      }
    }
  }

  function onSubmitForm(e) {
    e.preventDefault();
    console.log('onSubmit');
  }
  
  return (
    <div className={styles.wrapp}  ref={messageRef}>
      <CssBaseline />
      <HaderHideOnScroll />
      <Toolbar 
        id="back-to-top-anchor" 
      />
      <Paper 
        square 
        className={classes.paper}
      >
        <Typography 
          className={classes.text} 
          variant="h5" 
          gutterBottom>
            Test chat       
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, userName, message, person, event }) => (
            <React.Fragment key={id}>
              {event === 'connection' ? 
                <ListSubheader className={classes.newUser}>Пользователь {userName} подключился</ListSubheader> :
                <ListItem >
                  <ListItemAvatar>
                    {console.log(userName, myName, 'userName')}
                    <Avatar  alt="Profile Picture" src={person} 
                    style={userName === myName ? { display:'none'} : {display : 'block'}}  />
                  </ListItemAvatar>
                  <ListItemText 
                    className={classes.listitemText}
                    primary={userName === myName ? `${time}` : `${userName} ${time}`}
                    secondary={message}  
                    style={userName === myName ? {textAlign: 'right'} : {textAlign: 'left'}}
                  />
                </ListItem>
              }
            </React.Fragment>
          ))}
        </List>
      </Paper>
        <div >
            <form 
              className={styles.wrapp_bottom} 
              onSubmit={onSubmitForm}
            >
              <TextField
                className={styles.wrapp_bottom_textField}
                id="standard-multiline-flexible"
                label="Message"
                validat
                multiline
                autoFocus
                rowsMax={5}
                value={value}
                onChange={onChangeTextFiel} 
                onKeyDown={onKeyDownTextField}
              /> 
              <Button

                disabled={disabled}
                onClick={sendMessage}
                variant="contained"
                color="primary"
                size="normal"
                className={classes.button}
                startIcon={<SendIcon />}
                type='submit'
              />
            </form>
            <ScrollTop />
        </div>
    </div>
  );
}

export default Chat;

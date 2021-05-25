import React, {useState} from 'react';
import { InputAdornment, Button, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logo from '../Logo';
import { makeStyles } from '@material-ui/core/styles';
import styles from './index.module.scss';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: '40px'
  },
  button: {
    marginTop: '30px',
    width: '100%'
  }
}));

function AutorizartionForm({value, onClick, setUsername, setMyName}) {
  const [disabled, setDisabled] = useState(true);

  const classes = useStyles();

  function onSubmitForm(e) {
    e.preventDefault();
    console.log('onSubmit');
  }

  function onChangeTextField(e) {
    const value = e.target.value;
    setUsername(value); 
    setMyName(value)
    value.replace(/\s+/g, '').length > 0 ? setDisabled(false) : setDisabled(true);
  }

  return (
    <div className={styles.wrapp}>
      <form className={styles.wrapp_form} onSubmit={onSubmitForm}>
        <Logo 
          height="100px" 
          widtd="100px"
        />
        <TextField
          autoFocus
          className={classes.margin}
          value={value}
          onChange={onChangeTextField}
          id="input-with-icon-textfield"
          label="Введите ваше имя"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        /> 
          <Button 
            onClick={onClick}
            className={classes.button}
            type="submit"
            variant="outlined" 
            color="primary"
            disabled={disabled}
            >
              Войти
          </Button>
      </form>
    </div>
  );
}

export default AutorizartionForm;
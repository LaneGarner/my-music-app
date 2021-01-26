import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button  } from '@material-ui/core'
import './App.css';
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import rickRoll from './rick-roll.mp3';
import { Login } from './components/Login'
import { Dashboard } from "./components/Dashboard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const lowQuality = new Tone.BitCrusher(6);
  const lowPass = new Tone.Filter(800, "lowpass");
  const highPass = new Tone.Filter(1500, "highpass");
  const lowPass2 = new Tone.Filter(3000, "lowpass");
  const highPass2 = new Tone.Filter(300, "highpass");

  const player = new Tone.Player(rickRoll)
  player.loop = true;
  player.chain(Tone.Destination)
  


  const [user, setUser] = useState('')
  const handleNameInput = (e) => {
    setUser(e.target.value)
  }

  const [password, setPassword] = useState('')
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const [loggedIn, setLoggedIn] = useState(false)
  const handleLogin = (e) => {
      setLoggedIn(!loggedIn)
      {!loggedIn ? playRickRoll() : stopPlaying()}
  }

  const stopPlaying = () => {
    Tone.Transport.stop()
  }

  const playRickRoll = () => {
    StartAudioContext(Tone.context)
    Tone.loaded().then(() => {
    player.sync().start();
    Tone.Transport.start()
    });
  }

  const [online, setOnline] = useState(true)
  const handleToggle = (params) => {
    setOnline(!online)
  }

  const [volume, setVolume] = useState(80)
  const handleVolume = (e, newVol) => {
    setVolume(newVol)
  }

  const [quality, setQuality] = useState("high")
  const handleQuality = (e) => {
    setQuality(e.target.value)
  }

  useEffect(() => {
    const newVol = volume - 99    
    Tone.getDestination().volume.value = newVol
    
    Tone.Destination.mute = !online

    if(quality === "low") {
      Tone.Destination.chain(lowQuality, lowPass, highPass)
    } else if (quality === "normal") {
      Tone.Destination.chain(lowPass2, highPass2)
    } else {
      Tone.Destination.chain()
    }
  })

  const classes = useStyles();




  return (
  <div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            RollPlayer
          </Typography>
        {loggedIn && 
        <Button type="button" onClick={handleLogin} color="secondary" variant="contained">Sign out</Button>
        }
        </Toolbar>
      </AppBar>
    </div>
    {!loggedIn ? 
    <Login handlePasswordInput={handlePasswordInput} handleNameInput={handleNameInput} user={user} password={password} handleLogin={handleLogin}/> : 
    <Dashboard quality={quality} handleQuality={handleQuality} user={user} online={online} volume={volume} handleToggle={handleToggle} handleVolume={handleVolume} />}
  </div>
  );
}

export default App;
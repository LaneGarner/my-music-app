import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar  } from '@material-ui/core'
import './App.css';
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import rickRoll from './rick-roll.mp3';
import { Login } from './components/Login'
import { Dashboard } from "./components/Dashboard";

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
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  const [loggedIn, setLoggedIn] = useState(false)
  const handleLogin = (e) => {
      setLoggedIn(!loggedIn)
      playRickRoll()
  }

  const playRickRoll = () => {
    StartAudioContext(Tone.context)
    Tone.loaded().then(() => {
    player.start();
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
      console.log('low')
      // lowQuality.connect(getDestination())
      Tone.Destination.chain(lowQuality, lowPass, highPass)
    } else if (quality === "normal") {
      console.log('med')
      Tone.Destination.chain(lowPass2, highPass2)
    } else {
      Tone.Destination.chain()
      // Tone.getDestination().chain(lowQuality, Tone.Destination)
    }


  })


  return (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
          My Music App
        </Typography>
      </Toolbar>
    </AppBar>
    {!loggedIn ? 
    <Login handlePasswordInput={handlePasswordInput} handleNameInput={handleNameInput} user={user} password={password} handleLogin={handleLogin}/> : 
    <Dashboard quality={quality} handleQuality={handleQuality} user={user} online={online} volume={volume} handleToggle={handleToggle} handleVolume={handleVolume} />}
  </div>
  );
}

export default App;
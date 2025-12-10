import { useState } from 'react'
import './App.css'
import Greetings from './Greetings.jsx'
import Home from './Home.jsx'
import Counter from './Counter.jsx'
function App() {
  return (
    <>
      <h1>Hello</h1>
      <Home />
      <Greetings name="Kani" />
      <Counter />
    </>
  )
}

export default App


import React from 'react'
import {Routes , Route} from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Home from './pages/Home'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
       <NavBar/>
       <Routes>
         <Route path='/' element = {<Home/>} />
         <Route path='/buy' element = {<BuyCredit/>} />
         <Route path='/result' element = {<Result/>} />

       </Routes>
    </div>
  )
}

export default App

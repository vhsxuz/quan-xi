import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/home'
import ChallengeList from '../pages/challenge-list'
import Challenge from '../pages/challenge'

const route = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/challenge-list' element={<ChallengeList />} />
      <Route path='/challenge/:id' element={<Challenge />} />
    </Routes>
  );
}

export default route

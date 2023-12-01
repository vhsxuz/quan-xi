import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/home'
import ChallengeList from '../pages/challenge-list'

const route = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/challenge-list' element={<ChallengeList />} />
    </Routes>
  );
}

export default route
import React from 'react'
import Banner from './assets/image/banner.png'
import "./styles/index.scss";

const App: React.FC = () => {
  return <div>
    <p>Hello,This is pages!</p>
    <img src={Banner} alt="" />
  </div>
}

export {
  App
}
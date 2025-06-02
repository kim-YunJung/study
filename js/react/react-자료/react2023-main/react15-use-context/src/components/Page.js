import React from 'react';
import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Page = () => {
  const data = useContext(ThemeContext);
  console.log("Page컴포넌트", data);

  return (
    <div className="page">
      <Header></Header>
      <Content></Content>   
      <Footer></Footer>
    </div>    
  );
}

export default Page;


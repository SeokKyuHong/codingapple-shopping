import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from "./bootstrap/CollapsibleExample.jsx";
import ResponsiveAutoExample from "./bootstrap/ResponsiveAutoExample.jsx"
import { Routes, Route, Outlet } from "react-router-dom"
import DetailPage from './detail/DetailPage.jsx';
import data from './db/yejidata.js';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query' 

// import DrawingProgram from './live/DrawingProgram';
import Whiteboard from './live/Whiteboard';
import TestOverlay from './live/TestOverlay';
import { useNavigate } from "react-router-dom"
import Cart from './detail/Cart';


styled.button`
  background : yellow;
`


function App() {
  let [yeji, setYeji] = useState(data);
  let navigate = useNavigate();
  let a = localStorage.getItem('watched');
  let arr = JSON.parse(a);

  //처음 들어왔을떄 실행 할 것
  // useEffect(()=> {
  //   if (localStorage.getItem('watched') == null){
  //     localStorage.setItem('watched', JSON.stringify([]));
  //   }
  // }, [])




  return (
    <div className="App">

        <CollapsibleExample/>

      <Routes> 
        {/* 404 Error케이스 */}
        <Route path="*" element={
          <>
            <img alt='404' style={{width: '50%'}} src='https://nalab.kr/files/attach/images/643/430/033/2010-09-01%2021;10;01.jpg'></img> 
          </>
        } />

        {/* 메인 라우팅 */}
        <Route path="/" element={
          <>
            {/* 메인 베너  */}

            {/* 최근 본 상품 리스트(화면 우측에 진열) */}
            {/* <div className='recently'>
              <h3>최근 본 상품</h3>
              {
                arr != null ?
                  arr.map((b, i)=>{
                    return (
                      <div key={i}>
                      <img style={{width: "50%", textAlign: "center"}} alt='예지' src={ require('./img/yeji_0'+ yeji[b].id +'.jpg') }/>
                      </div>
                    )
                  }) : null
              }
            </div> */}

            <div className='back-bg'>
              <div className='main-bg'></div>
            </div>
            
            <Button variant="dark" onClick={ ()=>{
              let yeji_copy = [...yeji];
              yeji_copy.sort((a, b)=>{
                return a.title < b.title ? -1 : a.title > b.title ? 1:0;
              });
              setYeji(yeji_copy);
            } }>이름정렬</Button>
            <Button onClick={ () => {navigate("/live")} }>
              라이브페이지 바로가기
            </Button>
            
            {/* 메인 상품 이미지 */}
            <ResponsiveAutoExample yeji = {yeji}/>

            {/* 더보기 버튼 */}
            <div className='listPush'>
              <Button variant="danger" onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                  let yeji_copy = [...yeji, ...result.data];
                  setYeji(yeji_copy);
                })
                .catch(()=>{
                  console.log('실패염');
                })

              }}>더보기</Button>
            </div>
          </>
        } />

        {/* 상세페이지 라우팅 */}
        <Route path="/detail/:id" element={
          <>
          <DetailPage yeji={ yeji }/>  

          </>
        } />

        {/* 영상 라우팅 */}
        <Route path="/live" element={
          <>
            <Whiteboard/>
            <TestOverlay/>  
            {/* <DrawingProgram/> */}
          </>
        } />
        
        {/* About 라우팅 */}
        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <h2>member</h2> }></Route>
          <Route path="map" element={ <h2>map</h2> }></Route>
        </Route>

        {/* Cart 라우팅 */}
        <Route path="/cart" element={ <Cart/> }>
        </Route>
      </Routes>

      
      
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Outlet/>
    </div>
  )
}

export default App;

import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from 'react';


function FillExample() {
  let [tab, setTab] = useState(0);
  return (
    <div>
      <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
      </Nav>
      <TabContent tab = {tab}/>
    </div>
  );
}

function TabContent({tab}) {

  let [fade, setFade] = useState('');

  useEffect(()=>{
    let a = setTimeout(()=>{
      setFade('end')
    }, 100);    
    return ()=>{
      clearTimeout(a);
      setFade('')
    }
  }, [tab]);

  return (
    <div className={'start ' + fade}>
      {[<div>내용 1</div>, <div>내용 2</div>, <div>내용 3</div>][tab]}
    </div>)

}

export default FillExample;
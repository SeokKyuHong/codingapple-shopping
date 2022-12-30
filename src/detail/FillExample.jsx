import Nav from 'react-bootstrap/Nav';
import React, { useState } from 'react';


function FillExample() {
  let [tab, setTab] = useState(0);
  return (
    <>
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
    </>
  );
}

function TabContent({tab}) {
  if (tab === 0) {
    return <div>내용0</div>
  }
  else if (tab === 1) {
    return <div>내용1</div>
  }
  else{
    return <div>내용2</div>
  }

}

export default FillExample;
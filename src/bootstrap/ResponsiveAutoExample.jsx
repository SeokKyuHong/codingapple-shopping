import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YejiElem from './YejiElem.jsx';


function ResponsiveAutoExample(props) {
  return (
    <Container className='yeji-list'>
      <Row>
      {
      props.yeji.map((yeji, i) => {
        return(
            <Col sm={4} key={i}>
              <YejiElem i = {i} yeji = {yeji}/>
            </Col> 
        );
      })
      }
      </Row>
    </Container>
  );
}

export default ResponsiveAutoExample;
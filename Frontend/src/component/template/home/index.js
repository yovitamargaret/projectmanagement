import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import react1 from '../../images/react1.png'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../../images/logo.png'

import "../../template/home/index.css"


let Home = () =>{ //ada props
    return (
        <>
        {/* <div className="header">
        <label className="label-header"> */}
            {/* This site is no longer update */}
            {/* {props.labelHeader} */}
                 {/* <a href = "https://reactjs.org/" className="label-goto"> */}
                    {/* Go to react dev */}
                    {/* {props.labelGoto}
                </a>
        </label>
    </div> */}
    {/* <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
        <img src={logo} alt="logo" width="80" height="50"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

    <Container className='jumbotron'>
      <div className='jumbotronh1'>
          <h1 >React</h1>
      </div>

      <div className='jumbotronparagraph'>
      <p>
      A JavaScript library for building user interfaces
      </p>
      </div>

      <Row>
        <Col><Button className='jumbotronbutton' variant="primary">Learn More</Button></Col>
        <Col><a href='https://legacy.reactjs.org/tutorial/tutorial.html'>
      <p className='jumbotronparagraph2' >Take the Tutorial </p> 
      </a></Col>
      </Row>
      
    </Container>

    <Container className='description'>
    <Row>
        <Col sm>
          <h5>Declarative</h5>
          <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
          <p>Declarative views make your code more predictable and easier to debug.</p>
        </Col>
        <Col sm>
        <h5>Declarative</h5>
          <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
          <p>Declarative views make your code more predictable and easier to debug.</p>
        </Col>
        <Col sm>
        <h5>Declarative</h5>
          <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
          <p>Declarative views make your code more predictable and easier to debug.</p>
        </Col>
        </Row>
    </Container>

    <Container className='simplecomponent'>
    <Row>
        <Col sm className='simplecomponentcol1'>
        <h3>A Simple Component</h3>
          <p>RReact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.</p>
          <p>JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.</p>
        </Col>
        <Col sm>
        <div className='simplecomponentpic'>
          <img src={react1} alt="simple component" width="800" height="200"/>
        </div>
        </Col>
        </Row>
      
        <Row>
        <Col sm className='simplecomponentcol1'>
        <h3>A Simple Component</h3>
          <p>RReact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.</p>
          <p>JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.</p>
        </Col>
        <Col sm>
        <div className='simplecomponentpic'>
          <img src={react1} alt="simple component" width="800" height="200"/>
        </div>
        </Col>
        </Row>

        <Row>
        <Col sm className='simplecomponentcol1'>
        <h3>A Simple Component</h3>
          <p>RReact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.</p>
          <p>JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.</p>
        </Col>
        <Col sm>
        <div className='simplecomponentpic'>
          <img src={react1} alt="simple component" width="800" height="200"/>
        </div>
        </Col>
        </Row>

        <Row>
        <Col sm className='simplecomponentcol1'>
        <h3>A Simple Component</h3>
          <p>RReact components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.</p>
          <p>JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.</p>
        </Col>
        <Col sm>
        <div className='simplecomponentpic'>
          <img src={react1} alt="simple component" width="800" height="200"/>
        </div>
        </Col>
        </Row>
    </Container>

      <Container className='getstarted'>
      <Row className='getstartedrow'>
        <Col><Button className='jumbotronbutton' variant="primary">Learn More</Button></Col>
        <Col><a href='https://legacy.reactjs.org/tutorial/tutorial.html'>
      <p className='jumbotronparagraph2' >Take the Tutorial </p> 
      </a></Col>
      </Row>

      </Container>

    <MDBFooter className='custom-footer'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNmnuKeShmxY8SJ6aPFtgIj9Op9QoOGsutY0BiD3q5yawqbl1tcbLMKhxyzs8e9yvtH0&usqp=CAU" alt="facebook open source"></img>
              </h6>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>DOCS</h6>
              <p>
                <a href='#!' className='text-reset'>
                Installation
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Main Concepts
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Advanced Guides
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                API Reference
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Hooks
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Testing
                </a>
              </p>

              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>CHANNELS</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Github
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Stack Overflow
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Discussion Forums
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Reactiflux Chat
                </a>
              </p>
            </MDBCol>

          </MDBRow>

          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>COMMUNITY</h6>
              <p>
                <a href='#!' className='text-reset'>
                Code of Conduct
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Community Resources
                </a>
              </p>

              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>CHANNELS</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Tutorial
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Blog
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Acknowledgements
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Reactiflux Chat
                </a>
              </p>
            </MDBCol>
            
          </MDBRow>
        </MDBContainer>
      </section>

      {/* <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div> */}
    </MDBFooter>

      





    </>
    )

}

export default Home;
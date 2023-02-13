import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Navbar as NavbarBt, Offcanvas, Nav, Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { BiHome, BiSearchAlt2, BiImageAdd } from "react-icons/bi";
import { TbLogout, TbAugmentedReality } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { ImCompass2 } from "react-icons/im";
import { BsBookmarkStar } from "react-icons/bs";
import { PostCreate } from "../User/Post";



function Navbar() {
  const router = useRouter()

  const [width, setWidth] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(null)
  const [show, setShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)


  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    handleWindowSizeChange()
    setPage(window.location.pathname)
  }, []);

  useEffect(() => {
    width && width <= 768 ? setIsMobile(true) : setIsMobile(false);
  }, [width])

  const handleOpenModal = () => {
    setShow(false)
    setModalShow(true)
  }

  return (
    <>
      <NavbarBt key="lg" bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container fluid>
          <NavbarBt.Brand href="#" className="navbar-title">espello</NavbarBt.Brand>
          <NavbarBt.Toggle aria-controls="offcanvasNavbarBt-expand-lg" onClick={() => setShow(true)} />
          <NavbarBt.Offcanvas
            show={show}
            className="bg-dark"
            id="offcanvasNavbarBt-expand-lg"
            aria-labelledby="offcanvasNavbarBtLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id="navbar-title">
                espello
              </Offcanvas.Title>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end align-items-center">
              <Form className={isMobile ? 'pb-3' : 'pe-3'}>
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="найти"
                    aria-label="Search"
                  />
                  <Button variant="outline-light"><BiSearchAlt2 /></Button>
                </InputGroup>
              </Form>
              <Nav className="d-flex">
                <div className={isMobile ? 'btn-group-vertical' : 'btn-group'} role="group" aria-label="nav bgn">
                  <Button variant="outline-light" className={page == '/' ? 'active' : ''} onClick={() => { router.push("/") }}><BiHome /> домой</Button>
                  <Button variant="outline-light" onClick={handleOpenModal}><BiImageAdd /> создать</Button>
                  <Button variant="outline-light" className={page == '/im' ? 'active' : ''} onClick={() => { router.push("/im") }}><FiMessageSquare /> сообщения</Button>
                  <Button variant="outline-light" className={page == '/map' ? 'active' : ''} onClick={() => { router.push("/game") }}><ImCompass2 /> карта</Button>
                  <Button variant="outline-light" className={page == '/ar' ? 'active' : ''} onClick={() => { router.push("/game") }}><TbAugmentedReality /> доп.реальность</Button>
                  <Button variant="outline-light" className={page == '/bookmark' ? 'active' : ''} onClick={() => { router.push("/bookmark") }}><BsBookmarkStar /> избранное</Button>
                  <Button variant="outline-light" onClick={() => { router.push("/api/auth/logout") }}><TbLogout /> выход</Button>
                </div>
              </Nav>
            </Offcanvas.Body>
          </NavbarBt.Offcanvas>
        </Container>
      </NavbarBt>
      <PostCreate
        show={modalShow}
        setShow={setModalShow}
      />
    </>
  )
}

export default Navbar;
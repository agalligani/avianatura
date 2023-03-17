
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">AviaNatura</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">About</Nav.Link>
                <Nav.Link href="/">Guides</Nav.Link>
              <NavDropdown title="Tours" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/country/us">US Tours</NavDropdown.Item>
                <NavDropdown.Item href="/tours/country/mx">Mexico Tours</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tours in Europe" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/country/es">Spain - 2024</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tours in Asia" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/it">Thailand - 2024</NavDropdown.Item>
                <NavDropdown.Item href="/tours/es">Cambodia - 2024</NavDropdown.Item>
                <NavDropdown.Item href="/tours/es">India - 2024</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/tour/new">Add A Tour</Nav.Link>
              <Nav.Link href="/images">Upload Images</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
export default NavBar
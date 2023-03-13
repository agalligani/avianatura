
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
              <NavDropdown title="US Tours" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/adk">Adirondack Tours</NavDropdown.Item>
                <NavDropdown.Item href="/tours/capem">Cape May - NJ</NavDropdown.Item>
                <NavDropdown.Item href="/tours/ocnj">Ocean Country, NJ</NavDropdown.Item>
                <NavDropdown.Item href="/tours/az">South-East Arizona</NavDropdown.Item>
                <NavDropdown.Item href="/tours/saxz">Sax-Zimm Bog, Minnesota</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tours in Europe" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/it">Italy - 2024</NavDropdown.Item>
                <NavDropdown.Item href="/tours/es">Spain - 2024</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tours in Asia" id="basic-nav-dropdown">
                <NavDropdown.Item href="/tours/it">Thailand - 2024</NavDropdown.Item>
                <NavDropdown.Item href="/tours/es">Cambodia - 2024</NavDropdown.Item>
                <NavDropdown.Item href="/tours/es">India - 2024</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
export default NavBar
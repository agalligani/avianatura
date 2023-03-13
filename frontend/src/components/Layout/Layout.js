import Container from 'react-bootstrap/Container';
import NavBar from "../NavBar/NavBar"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <Container>
    <NavBar />
    <div className="App">
      <header className="App-header">
        <h1>AvianNatura - Bird & Nature Tours</h1>
      </header>
      <Outlet />
    </div>
    </Container>
  )
}
export default Layout
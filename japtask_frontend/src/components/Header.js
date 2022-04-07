import { FaSignInAlt, FaPlus, FaUser } from "react-icons/fa";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../store/auth/auth-slice";
import { Navbar, Container, Dropdown, Nav, Button } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to={"/"}>
            <span className="fs-5">Normative Calculator App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mx-2">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    <FaSignInAlt /> Login
                  </Nav.Link>
                </>
              )}

              {user && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      <span className="me-1">
                        <FaUser />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
            {user && (
              <div>
                <Button as={Link} to="/addrecipe" variant="success">
                  <FaPlus /> Add Recipe
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

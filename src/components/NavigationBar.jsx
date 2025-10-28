import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import { useCart } from "../contexts/CartContext";

function NavigationBar() {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/addproduct">Add Product</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/cart" className="d-flex align-items-center">
              Cart{" "}
              {cartItemsCount > 0 && (
                <Badge bg="danger" className="ms-1">
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

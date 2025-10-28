import { useCart } from "../contexts/CartContext";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  if (cart.items.length === 0) {
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Your Cart</h2>
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Your Cart</h2>
          <Card>
            <ListGroup variant="flush">
              {cart.items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-0">{item.title}</h6>
                      <small className="text-muted">${item.price}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer>
              <Row>
                <Col>
                  <h5>Total: ${getCartTotal()}</h5>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="outline-danger"
                    className="me-2"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button variant="success">Checkout</Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;

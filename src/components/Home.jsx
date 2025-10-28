import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-4">
              Welcome to FakeStore Demo
            </h1>
            <p className="lead fs-5 text-muted mb-4">
              Discover amazing products at unbeatable prices. Your one-stop shop
              for electronics, jewelry, men's clothing, and women's clothing.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products
              </Link>
              <Link to="/cart" className="btn btn-outline-secondary btn-lg">
                View Cart
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-shopping-cart fs-1 text-primary"></i>
                  </div>
                  <Card.Title className="h5">Easy Shopping</Card.Title>
                  <Card.Text className="text-muted">
                    Browse our extensive catalog and add items to your cart with
                    just one click.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-star fs-1 text-warning"></i>
                  </div>
                  <Card.Title className="h5">Quality Products</Card.Title>
                  <Card.Text className="text-muted">
                    All our products are carefully curated to ensure the highest
                    quality standards.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-truck fs-1 text-success"></i>
                  </div>
                  <Card.Title className="h5">Fast Delivery</Card.Title>
                  <Card.Text className="text-muted">
                    Get your orders delivered quickly with our reliable shipping
                    partners.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Store Categories */}
          <div className="text-center mb-5">
            <h2 className="mb-4">Shop by Category</h2>
            <Row className="g-3">
              <Col sm={6} md={3}>
                <Card className="border-0 bg-light">
                  <Card.Body className="text-center py-4">
                    <i className="fas fa-laptop fs-2 text-info mb-2"></i>
                    <Card.Title className="h6">Electronics</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} md={3}>
                <Card className="border-0 bg-light">
                  <Card.Body className="text-center py-4">
                    <i className="fas fa-gem fs-2 text-danger mb-2"></i>
                    <Card.Title className="h6">Jewelery</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} md={3}>
                <Card className="border-0 bg-light">
                  <Card.Body className="text-center py-4">
                    <i className="fas fa-tshirt fs-2 text-primary mb-2"></i>
                    <Card.Title className="h6">Men's Clothing</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} md={3}>
                <Card className="border-0 bg-light">
                  <Card.Body className="text-center py-4">
                    <i className="fas fa-female fs-2 text-warning mb-2"></i>
                    <Card.Title className="h6">Women's Clothing</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Call to Action */}
          <Card className="bg-primary text-white text-center">
            <Card.Body className="py-5">
              <h3 className="mb-3">Start Shopping Today!</h3>
              <p className="mb-4 fs-5">
                Join thousands of satisfied customers and discover your next
                favorite product.
              </p>
              <Link to="/products" className="btn btn-light btn-lg">
                Explore All Products
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

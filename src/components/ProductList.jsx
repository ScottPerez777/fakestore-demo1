import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  {
    /* useEffect only runs once on the initial component render, at least if you have an empty dependency array.
        If we add other variables into the dependency array, then we list them as dependencies. And if the value of any dependency
        changes, then useEffect() runs again. */
  }
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${productId}`);

        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-3">
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Link
                      className="btn btn-outline-secondary btn-sm"
                      to={`/products/${product.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="d-flex gap-1 mb-2">
                    <Link
                      className="btn btn-warning btn-sm flex-fill"
                      to={`/products/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-fill"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;

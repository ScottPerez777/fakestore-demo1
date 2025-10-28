import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useCart } from "../contexts/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  {
    /* 
        Upon any detected changes in the state of 'id', make an HTTP GET request to FakeStoreAPI 
        to retrieve the product details for that particular product id.
        Then, save the result in the 'product' variable. 
    */
  }
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);

        navigate("/products");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Card className="product-card">
        <Card.Img
          className="product-image"
          variant="top"
          src={product.image}
          alt={product.title}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className="h5 text-primary">${product.price}</Card.Text>
          <div className="d-flex gap-2 mb-3">
            <Button
              variant="success"
              size="lg"
              onClick={handleAddToCart}
              className="flex-fill"
            >
              Add to Cart
            </Button>
          </div>
          <div className="d-flex gap-2">
            <Link
              to={`/products/${id}/edit`}
              className="btn btn-warning btn-lg flex-fill"
            >
              Edit Product
            </Link>
            <Button
              variant="danger"
              size="lg"
              onClick={handleDeleteProduct}
              className="flex-fill"
            >
              Delete Product
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;

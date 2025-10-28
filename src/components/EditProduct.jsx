import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          image: response.data.image,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const updatedProduct = {
        title: product.title,
        price: parseFloat(product.price),
        description: product.description,
        image: product.image,
        category: product.category,
      };

      await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updatedProduct
      );
      setSuccess(true);

      setTimeout(() => {
        navigate(`/products/${id}`);
      }, 1500);
    } catch (error) {
      setError("Failed to update product. Please try again.");
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading product...</p>
      </Container>
    );
  if (error && !product.title)
    return (
      <Container className="mt-4">
        <p>{error}</p>
      </Container>
    );

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h2>Edit Product</h2>
        </Card.Header>
        <Card.Body>
          {success && (
            <Alert variant="success">
              Product updated successfully! Redirecting to product details...
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                required
                disabled={updating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
                disabled={updating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
                disabled={updating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                disabled={updating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                required
                disabled={updating}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="success"
                type="submit"
                disabled={updating}
                className="flex-fill"
              >
                {updating ? "Updating..." : "Update Product"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/products/${id}`)}
                disabled={updating}
                className="flex-fill"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditProduct;

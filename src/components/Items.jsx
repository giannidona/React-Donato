import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Item = ({ prod }) => {
  return (
    <Col xs={12} md={6} lg={4} className="d-flex justify-content-center">
      <Card key={prod.id} style={{ width: "18rem" }} className="mt-4">
        <Card.Img variant="top" src={prod.img} />
        {/* NO CARGAN LAS IMAGENES */}
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Text>{prod.details}</Card.Text>
          <Card.Text>{prod.price}</Card.Text>
          <Link to={`/item/${prod.id}`}>
            <Button variant="primary">View more</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={4}>
          <Card className="m-4">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <h1>
                <GiMeal className="text-warning" />
              </h1>
              <hr />
              <h4>Recipes</h4>
              <Link to={`/recipes`}>
                <Button size="sm" variant="success" className="mt-4">
                  View
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="m-4">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <h1>
                <GiMeal className="text-warning" />
              </h1>
              <hr />
              <h4>Categories</h4>
              <Link to={`/categories`}>
                <Button size="sm" variant="success" className="mt-4">
                  View
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="m-4">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <h1>
                <GiMeal className="text-warning" />
              </h1>
              <hr />
              <h4>Ingredients</h4>
              <Link to={`/ingredients`}>
                <Button size="sm" variant="success" className="mt-4">
                  View
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

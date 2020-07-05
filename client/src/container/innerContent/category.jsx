import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class Category extends Component {
  state = {
    categories: [],
    test: true
  };
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({ test: false });
    // }, 5000);
    console.log("Compont did Mount");
    if (this.props.match.params.slug) {
      axios
        .get(
          "http://localhost:1337/categories/?slug=" +
            this.props.match.params.slug
        )
        .then(res => {
          this.setState({ categories: res.data });
        });
    } else {
      axios
        .get("http://localhost:1337/categories")
        .then(res => {
          res.data.sort((a, b) => {
            var x = a.slug.toLowerCase();
            var y = b.slug.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          });
          this.setState({ categories: res.data });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  componentDidUpdate() {
    console.log("componet did update");
    console.log(this.props);
  }

  render() {
    return (
      <Form className="">
        <Form.Group controlId="formGroupCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control type="text" placeholder="Category Name" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridParent">
          <Form.Label>Parent Category</Form.Label>
          <Form.Control as="select">
            {this.state.categories.map(value => {
              let indent = value.slug.split("_").length - 1;
              return (
                <option style={{ paddingLeft: indent * 2 + "rem" }}>
                  {value.slug}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupCategoryDes">
          <Form.Label>Description</Form.Label>
          <Form.Control type="textarea" placeholder="Enter email" />
        </Form.Group>
      </Form>
    );
  }
}

export default Category;

{
  /* <Col key={value._id} md={this.props.match.params.slug ? 12 : 4}>
            <Card className="border-top-0" style={{ margin: ".5rem .7rem" }}>
              <Card.Body>
                <Card.Img
                  src={"http://localhost:1337" + value.image.url}
                ></Card.Img>
                <Card.Title>{value.name}</Card.Title>
                <Card.Text>
                  {value.description}
                  <br />
                  {!this.props.match.params.slug ? (
                    <Link
                      to={"/category/" + value.slug}
                      className="btn btn-secondary"
                    >
                      More...
                    </Link>
                  ) : null}
                </Card.Text>
                <Card.Text className="text-right">
                  Created at: {value.createdAt}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */
}

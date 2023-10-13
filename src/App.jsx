import { useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import "./App.css";

function App() {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState({
    rating: "",
    name: "",
    text: "",
  });
  const [errors, setErrors] = useState({
    nameErr: false,
    textErr: false,
  });
  function handleInputs(e) {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(comment);
    console.log(errors);
    if (comment.name.length <= 2 || comment.name === "") {
      setErrors({
        ...errors,
        nameErr: true,
      });
    }
    if (comment.text.length <= 6) {
      setErrors({
        ...errors,
        textErr: true,
      });
    }
    // setModal(false);
  }
  return (
    <div className="App">
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Submit Comment
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <br />
                  <select name="rating" id="rating" onChange={handleInputs}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </Col>
              <br />
              <Col lg={12}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleInputs}
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                  {errors.nameErr && (
                    <p className="err">
                      *Name must be greater than 2 characters
                    </p>
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="text">Comment</label>
                  <textarea
                    onChange={handleInputs}
                    name="text"
                    id="comment"
                    className="form-control"
                    placeholder="Enter text here..."
                    style={{ resize: "none" }}
                  />
                  {errors.textErr && (
                    <p className="err">
                      *Comment must be greater than 6 characters
                    </p>
                  )}
                </div>
              </Col>
              <Col>
                <div className="btnDiv">
                  <br />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <button onClick={() => setModal(true)}>Add Comment</button>
    </div>
  );
}

export default App;

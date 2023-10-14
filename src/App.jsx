import { useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import "./App.css";

function App() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([
    {
      rating: "4",
      name: "Rohan Puri",
      text: "Great UI",
    },
  ]);
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
    setErrors({
      nameErr: false,
      textErr: false,
    });
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let nam = comment.name;
    let txt = comment.text;
    if (nam === "" || (nam.length <= 2 && txt === "" && txt.length <= 6)) {
      console.log(true);
      setErrors({
        ...errors,
        nameErr: true,
        textErr: true,
      });
    } else if (nam === "" || nam.length <= 2) {
      setErrors({
        ...errors,
        nameErr: true,
      });
    } else if (txt === "" || txt.length <= 6) {
      setErrors({
        ...errors,
        textErr: true,
      });
    } else {
      setData([...data, comment]);
      setComment({
        rating: "",
        name: "",
        text: "",
      });
    }
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
                  <select
                    name="rating"
                    id="rating"
                    onChange={handleInputs}
                    value={comment.rating}
                  >
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
                    value={comment.name}
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
                    value={comment.text}
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

      <div className="div">
        <h2>All Comments</h2>
        {data.map((cm, ele) => {
          return (
            <div key={ele} className="inner">
              <h3>Name: {cm.name}</h3>
              <h5>comment : {cm.text}</h5>
              <h5>rating : {cm.rating}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

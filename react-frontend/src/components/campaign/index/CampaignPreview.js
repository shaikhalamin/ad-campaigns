import React from "react";
import { Row, Col, Button, Modal, Card, ListGroup } from "react-bootstrap";
import { BASEURL } from "../../../helpers/api.helpers";

function CampaignPreview({ images }) {
  const [modalShow, setModalShow] = React.useState(false);

  const openModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Creative Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mt-2">
            {images &&
              images.map((item) => {
                return (
                  <Col md={6} key={item.id}>
                    <Card>
                      <Card.Body className="d-flex justify-content-center">
                        <img
                          src={`${BASEURL}/uploads/files/${item.url}`}
                          alt={`new_cat`}
                          className="img-fluid"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => closeModal()}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Button variant="primary" size="sm" onClick={() => openModal()}>
        Creative Preview
      </Button>
    </>
  );
}

export default CampaignPreview;

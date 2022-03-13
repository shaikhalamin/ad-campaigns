import React from "react";
import { Button, Modal } from "react-bootstrap";

function CampaignPreview({ images }) {
  const [modalShow, setModalShow] = React.useState(false);

  const openModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Creative Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(images, null, 2)}</Modal.Body>
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

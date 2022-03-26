import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ErrorButton from "./ErrorButton";

const ModalButton = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Results</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">Buyer Search Results</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
        <ErrorButton />
      </Toast>
    </>
  );
};

export default ModalButton;

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Configuration, OpenAIApi } from 'openai';
import { data } from "../Constants";
const configuration = new Configuration({
  apiKey: data.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function GetModelDetails() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modelResponse, setModelResponse] = useState('');

  const handleOpenModal = async () => {
    try {
      const response = await openai.retrieveModel('text-davinci-003');
      setModelResponse(JSON.stringify(response, null, 2));
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Show Complete Details</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
      >
        <pre>{modelResponse}</pre>
        <button className = "btn btn-primary" onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
}

export default GetModelDetails;

import * as React from "react";
import { Button, Modal } from 'antd';

const BOTONGENIAL: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        ¡Ábreme!
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>¿Sabías que</p>
        <p>"zanahoria" en catalán</p>
        <p>Sse dice <b>"pastanaga"</b></p>
      </Modal>
    </>
  );
};

export default BOTONGENIAL;
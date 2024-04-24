/* eslint-disable @typescript-eslint/no-explicit-any*/
import * as React from "react";
import { Button, Modal } from 'antd';

const Troll: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
      Hehe, ¿por qué alguien no se fiaría de este botón tan guay?
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            DINERO GRATIS
          </Button>,
        ]}
      >
        <p>Grandes riquezas te serán garantizadas...</p>
        <p>¡Presiona el botón de la fortuna!</p>
      </Modal>
    </>
  );
};

export default Troll;
/*eslint-enable*/
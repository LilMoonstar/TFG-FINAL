/* eslint-disable @typescript-eslint/no-explicit-any*/
import * as React from "react";
import { Button, Modal } from 'antd';

const Infinito: React.FC = () => {
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
        loop
      </Button>
      <Modal
        open={open}
        title="LOOP"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            CANCELAR
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            ACEPTAR
          </Button>,
        <Infinito />
        ]}
      >
      </Modal>
    </>
  );
};

export default Infinito;
/*eslint-enable*/
import * as React from "react";
import { Modal, Button } from "antd";

interface InscritosFormProps {
  visible: boolean;
}

const InscritosForm: React.FC<InscritosFormProps> = ({ visible }) => {
  return (
    <Modal
      open={visible}
      footer={[
        <Button key="cancel">
          No
        </Button>,
        <Button key="confirm">
          Sí
        </Button>
      ]}
    >
      ¿Seguro que quieres inscribirte a este evento?
    </Modal>
  );
};

export default InscritosForm;

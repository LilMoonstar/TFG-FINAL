/* eslint-disable*/
import * as React from "react";
import { Modal, Form, Input, Button } from "antd";

interface InscritosFormProps {
  visible: boolean;
  onClose: () => void;
}

const InscritosForm: React.FC<InscritosFormProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      title="Formulario de Inscripción"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Enviar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            { required: true, message: "Por favor ingrese su correo electrónico" },
            { type: "email", message: "Por favor ingrese un correo electrónico válido" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mensaje"
          label="Mensaje"
          rules={[{ required: true, message: "Por favor ingrese un mensaje" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InscritosForm;
/* eslint-enable*/

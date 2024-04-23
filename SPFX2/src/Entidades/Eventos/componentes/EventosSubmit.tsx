import * as React from "react";
import { Button, Modal } from 'antd';

const BOTONGENIAL: React.FC<{ titlename: string, text: string, backgroundColor: string, fontColor: string }> = ({ titlename, text, backgroundColor, fontColor }) => {
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

    const buttonStyle = {
        backgroundColor: backgroundColor,
        color: fontColor,
    };

    return (
        <>
            <Button type="primary" onClick={showModal} style={buttonStyle}>
                {titlename}
            </Button>
            <Modal title={titlename} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ whiteSpace: "pre-line" }}>{text}</div>
            </Modal>
        </>
    );
};

export default BOTONGENIAL;

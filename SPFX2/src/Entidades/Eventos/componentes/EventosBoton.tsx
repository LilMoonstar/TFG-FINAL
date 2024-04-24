import * as React from "react";
import { Button, Modal } from 'antd';

const BOTONGENIAL: React.FC<{titlename:string, text: string }> = ({titlename, text }) => {
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
                {titlename}
            </Button>
            <Modal title={titlename} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ whiteSpace: "pre-line" }}>{text}</div>
            </Modal>
        </>
    );
};

export default BOTONGENIAL;
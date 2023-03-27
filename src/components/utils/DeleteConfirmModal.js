import React from "react";
import { Modal, Button } from "flowbite-react";
const DeleteConfirmModal = ({
    delModalStatus,
    setDelModalStatus,
    deleteConfirmFunc,
}) => {
    return (
        <>
            <Modal
                show={delModalStatus}
                size='md'
                onClose={(e) => setDelModalStatus(false)}
            >
                {/* <Modal.Header /> */}
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this task?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={(e) => deleteConfirmFunc(e)}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color='gray'
                                onClick={(e) => setDelModalStatus(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteConfirmModal;

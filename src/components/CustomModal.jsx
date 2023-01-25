import React from 'react';
import classes from "./Index.module.css";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CustomModal = ({open, closeModal, biggerImage}) => {
    return (
        <Modal
            isOpen={open}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Modal"
            ariaHideApp={false}

        > <img src={biggerImage} alt={''}/>
            <div className={classes.modalB}>
                <button className='btn btn-primary' onClick={closeModal}>Close</button>
            </div>

        </Modal>

    );
}

export default CustomModal;
import React from 'react';

const ConfirmationModal = ({ title, message, successAction, modalData, successBtnName }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-primary text-xl">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">{successBtnName}</label>
                        <label htmlFor="confirmation-modal" className="btn btn-primary btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
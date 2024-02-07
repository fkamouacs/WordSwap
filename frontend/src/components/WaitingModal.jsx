import React from 'react';
import PropTypes from 'prop-types';

// WaitingModal component definition
const WaitingModal = ({ isWaiting, onCancel, countdown }) => {
    // If not in waiting state, don't render anything
    if (!isWaiting) return null;

    return (
        <div className="waiting-modal">
            <div className="modal-content">
                <h2>Waiting for another player...</h2>
                {/* Show countdown if provided */}
                {countdown && <p>Game starts in: {countdown} seconds</p>}
                {/* Button to cancel waiting */}
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

// Prop type validation
WaitingModal.propTypes = {
    isWaiting: PropTypes.bool.isRequired,  // Boolean to control visibility of modal
    onCancel: PropTypes.func.isRequired,  // Function to call when cancel is clicked
    countdown: PropTypes.number           // Optional countdown value
};

export default WaitingModal;

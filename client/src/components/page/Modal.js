import React from "react";

export default function Modal({ close, show, children}) {
	const showModal = show ? "custom-modal display-block" : "display-none";

	return (
		<div className={showModal}>
			<div className="custom-modal-main">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Booking</h5>
							<button
								type="button"
								className="close"
								onClick={() => close(false)}
							>
								<span>&times;</span>
							</button>
						</div>
						<div className="modal-body">{children}</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => close(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

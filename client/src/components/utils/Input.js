import React from "react";

const Input = React.forwardRef((props, ref) => {
	const { id, label, errors, ...rest } = props;
	return (
		<React.Fragment>
			<input {...rest} id={id} ref={ref} className="form-control" />
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			{errors && <small className="text-danger">{errors.message}</small>}
		</React.Fragment>
	);
});

export default Input;

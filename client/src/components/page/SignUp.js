import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import Alerts from "../utils/Alerts";
import ButtonSpin from "../utils/ButtonSpin";
import Input from "../utils/Input";

export default function SignUp() {
	return (
		<div className="custom-center">
			<div className="container h-100">
				<div className="row h-100 align-items-center justify-content-center">
					<div className="card card-signup col-4 mb-3">
						<div className="card-body">
							<SignUpForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const SignUpForm = () => {
	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const { register, errors, handleSubmit, setError } = useForm({
		mode: "onChange",
	});

	const history = useHistory();
	const [spinner, setSpinner] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		setSpinner(true);
		try {
			await axios.post("/api/users/signUp", data);
			setSpinner(false);
			history.push("/sign-in");
		} catch (e) {
			const errorResponse = e.response.data.message;

			if (errorResponse) {
				setError("email", {
					type: "manual",
					message: errorResponse,
				});

				setAlert({
					status: "failure",
					message: errorResponse,
					color: "danger",
				});
			} else {
				setAlert({
					status: "failure",
					message: e.message,
					color: "danger",
				});
			}
			setSpinner(false);
		}
	});

	return (
		<form onSubmit={onSubmit} className="form-signup" noValidate>
			<h3 className="mb-3 card-title text-center">Sign Up</h3>
			<div className="mb-3 form-label-group">
				<Input
					autoFocus={true}
					label="Name"
					type="text"
					id="name"
					name="name"
					placeholder="Name"
					errors={errors.name}
					ref={register({ required: "Name is required" })}
				/>
			</div>
			<div className="mb-3 form-label-group">
				<Input
					label="Email Address"
					type="email"
					id="email"
					name="email"
					placeholder="Email Address"
					errors={errors.email}
					ref={register({
						required: "Email is required",
						validate: (value) =>
							value.includes("@") ||
							"Email must include '@' symbol",
					})}
				/>
			</div>
			<div className="mb-3 form-label-group">
				<Input
					label="Password"
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					errors={errors.password}
					ref={register({
						required: "Password is required",
						validate: (value) =>
							value.length >= 6 ||
							"Password must be at least 6 characters",
					})}
				/>
			</div>
			<div className="mb-3">
				<ButtonSpin spinner={spinner} name="Sign Up"/>
				<button
					type="button"
					className="btn btn-secondary btn-block custom-btn"
					onClick={() => history.push("/")}
				>
					Cancel
				</button>
			</div>
			<hr className="my-1"/>
			<div className="text-center">
				<Link to="/sign-in" className="card-link mb-3 text-decoration-none">
					Have an account? Sign in!
				</Link>
			</div>
			<Alerts
				status={alert.status}
				setAlert={setAlert}
				message={alert.message}
				color={alert.color}
			/>
		</form>
	);
};

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import auth from "./utils/auth";
import Alerts from "./utils/Alerts";
import ButtonSpin from "./utils/ButtonSpin";
import Input from "./utils/Input";

export default function SignIn() {
	return (
		<div className="custom-center">
			<div className="container h-100">
				<div className="row h-100 align-items-center justify-content-center">
					<div className="card card-signin col-4 mb-3">
						<div className="card-body">
							<SignInForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const SignInForm = () => {
	const { register, errors, handleSubmit } = useForm();

	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const history = useHistory();
	const [spinner, setSpinner] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		setSpinner(true);
		try {
			const res = await axios.post("/api/users/signIn", data);
			document.cookie = res.data.token;
			setSpinner(false);
			auth.signIn(() => {
				history.push("/dashboard");
			});
		} catch (e) {
			const errorResponse = e.response.data.message;
			if (errorResponse) {
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
		<form onSubmit={onSubmit} className="form-signin" noValidate>
			<h3 className="mb-3 card-title text-center">Sign In</h3>
			<div className="mb-3 form-label-group">
				<Input
					autofocus="true"
					label="Email Address"
					type="email"
					id="email"
					name="email"
					placeholder="Email Address"
					errors={errors.email}
					ref={register({ required: "Email is required" })}
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
					ref={register({ required: "Password is required" })}
				/>
			</div>
			<div className="mb-3">
				<ButtonSpin spinner={spinner} />
				<button
					type="button"
					className="btn btn-secondary btn-block custom-btn"
					onClick={() => history.push("/")}
				>
					Cancel
				</button>
			</div>
			<hr className="my-1" />
			<div className="text-center">
				<Link to="/sign-up" className="card-link mb-3">
					Create an Account
				</Link>
			</div>
			<Alerts
				setAlert={setAlert}
				status={alert.status}
				message={alert.message}
				color={alert.color}
			/>
		</form>
	);
};

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Alerts from "./Alerts";
import Input from "./Input";
import ButtonSpin from "./ButtonSpin";

export default function Booking({ update, setUpdate, method }) {
	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const [spinner, setSpinner] = useState(false);

	const { register, handleSubmit, errors, watch } = useForm();
	const watchStartDate = watch("startDate", Date.now());
	const onSubmit = handleSubmit(async (data) => {
		setSpinner(true);
		try {
			const cookieValue = document.cookie
				.split("; ")
				.find((row) => row.startsWith("token"))
				.split("=")[1];
			const header = {
				headers: { Authorization: `Bearer ${cookieValue}` },
			};
			const res = await axios.post("/api/rooms/booking", data, header);
			console.log(res);
			setUpdate(update + 1);
		} catch (e) {
			const errorResponse = e.response.data.message;

			if (errorResponse) {
				setAlert({
					status: true,
					message: errorResponse,
					color: "danger",
				});
			} else {
				setAlert({
					status: true,
					message: e.message,
					color: "danger",
				});
			}
		}
		setSpinner(false);
	});
	return (
		<form onSubmit={onSubmit}>
			<div className="mb-3 form-label-group">
				<Input
					label="Check In Date"
					type="date"
					id="startDate"
					name="startDate"
					errors={errors.startDate}
					ref={register({
						required: "This field is required",
						validate: (value) =>
							new Date(value) >= Date.now() ||
							"Cannot book from this date",
					})}
				/>
			</div>
			<div className="mb-3 form-label-group">
				<Input
					label="Check Out Date"
					type="date"
					id="endDate"
					name="endDate"
					errors={errors.endDate}
					ref={register({
						required: "This field is required",
						validate: (value) =>
							new Date(value) >= new Date(watchStartDate) ||
							"Cannot book from this date",
					})}
				/>
			</div>
			<div className="mb-3 form-label-group">
				<select
					className="form-select"
					id="roomType"
					name="roomType"
					ref={register}
				>
					<option value="single">Single Room</option>
					<option value="family">Family Room</option>
					<option value="deluxe">Deluxe Room</option>
				</select>
				<label htmlFor="roomType" className="form-label">
					Select
				</label>
			</div>
			<div className="mb-3">
				<ButtonSpin spinner={spinner} name="Submit" />
			</div>
			<Alerts
				status={alert.status}
				setAlert={setAlert}
				message={alert.message}
				color={alert.color}
			/>
		</form>
	);
}

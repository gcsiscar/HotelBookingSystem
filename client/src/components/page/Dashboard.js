import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Input from "../utils/Input";
import Alerts from "../utils/Alerts";
import ButtonSpin from "../utils/ButtonSpin";
import Modal from "./Modal";

export default function Dashboard({ auth }) {
	const [update, setUpdate] = useState(0);
	const [show, setShow] = useState(false);
	const history = useHistory();
	return (
		<div className="container">
			<div className="row row-cols-2">
				<div className="col-4">
					<div className="card mt-3">
						<div className="card-header bg-primary text-white">
							Create A Booking
						</div>
						<div className="card-body">
							<Booking setUpdate={setUpdate} update={update} />
						</div>
					</div>
				</div>
				<div className="col-8">
					<div className="card mt-3">
						<div className="card-header bg-primary text-white">
							Placeholder Header
						</div>
						<div className="card-body">
							<Table update={update} />
						</div>
					</div>
				</div>
				<div>
					<Modal show={show} close={setShow}>
					<Booking/>
					</Modal>
					<button onClick={() => setShow(true)}>Click Me</button>
				</div>
				<div>
					<button
						onClick={() => {
							auth.signOut(() => {
								document.cookie =
									"token=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
								history.push("/");
							});
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

const Booking = ({ update, setUpdate }) => {
	const { register, handleSubmit, errors, watch, clearErrors } = useForm();

	const watchStartDate = watch("startDate", Date.now());

	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const [spinner, setSpinner] = useState(false);

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
			const res = await axios.post("/api/rooms", data, header);
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
			<div className="mb-3">
				<ButtonSpin spinner={spinner} name="Submit" />
				<button
					type="button"
					className="btn btn-secondary btn-block custom-btn"
					onClick={() => clearErrors()}
				>
					Cancel
				</button>
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

const Table = ({ update }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const cookieValue = document.cookie
					.split("; ")
					.find((row) => row.startsWith("token"))
					.split("=")[1];
				const header = {
					headers: { Authorization: `Bearer ${cookieValue}` },
				};
				const res = await axios.get("/api/rooms/booking", header);
				setData([...res.data]);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, [update]);
	return (
		<table className="table m-0">
			<thead>
				<tr>
					<th scope="col">Check In Date</th>
					<th scope="col">Check Out Date</th>
					<th scope="col">Duration</th>
					<th scope="col">Total</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map((data, index) => (
					<tr key={index}>
						<td>{data.startDate}</td>
						<td>{data.endDate}</td>
						<td>{data.room}</td>
						<td>{data.duration}</td>
						<td>
							<ButtonList />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const ButtonList = () => {
	return (
		<ul className="list-inline m-0">
			<li className="list-inline-item">
				<button
					className="btn btn-success btn-sm rounded-0"
					type="button"
					data-toggle="tooltip"
					data-placement="top"
					title="Edit"
				>
					<span>2</span>
				</button>
			</li>
			<li className="list-inline-item">
				<button
					className="btn btn-danger btn-sm rounded-0"
					type="button"
					data-toggle="tooltip"
					data-placement="top"
					title="Delete"
				>
					<span>2</span>
				</button>
			</li>
		</ul>
	);
};

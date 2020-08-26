import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Input from "../utils/Input";
import Alerts from "../utils/Alerts";
import ButtonSpin from "../utils/ButtonSpin";
import Modal from "./Modal";

export default function Dashboard({ auth }) {
	const history = useHistory();
	return (
		<div className="container">
			<div className="row row-cols-2">
				<div className="col-12">
					<div className="card mt-3">
						<div className="card-header bg-primary text-white">
							Bookings
						</div>
						<div className="card-body">
							<Table />
						</div>
					</div>
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

const Booking = ({ update, setUpdate, method, _id }) => {
	const { register, handleSubmit, errors, watch } = useForm();

	const watchStartDate = watch("startDate", Date.now());

	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const [spinner, setSpinner] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		const { startDate, endDate, roomType } = data;
		setSpinner(true);
		try {
			const cookieValue = document.cookie
				.split("; ")
				.find((row) => row.startsWith("token"))
				.split("=")[1];
			const header = {
				headers: { Authorization: `Bearer ${cookieValue}` },
			};
			if (method === "post") {
				await axios.post("/api/rooms/booking", data, header);
			}

			if (method === "put") {
				await axios({
					method: "put",
					url: "/api/rooms/booking",
					headers: header.headers,
					data: { startDate, endDate, roomType, _id },
				});
			}
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
					<option value="Single">Single Room</option>
					<option value="Family">Family Room</option>
					<option value="Deluxe">Deluxe Room</option>
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
};

const Table = () => {
	const [update, setUpdate] = useState(0);
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
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
				console.log(res.data);
				setData([...res.data]);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, [update]);
	return (
		<React.Fragment>
			<table className="table table-borderless table-responsive table-hover m-0">
				<thead>
					<tr className="text-center">
						<th>#</th>
						<th>Room</th>
						<th>Type</th>
						<th>Check In</th>
						<th>Check Out</th>
						<th>Days</th>
						<th>Invoice</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((data, index) => (
						<tr className="text-center" key={index}>
							<td>{index + 1}</td>
							<td>{data.room_name}</td>
							<td>{data.room_type}</td>
							<td>{data.startDate}</td>
							<td>{data.endDate}</td>
							<td>{data.duration}</td>
							<td>Php {data.total}</td>
							<td>
								<Action
									_id={data._id}
									update={update}
									setUpdate={setUpdate}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button
					className="btn btn-sm w-25 btn-primary custom-btn"
					onClick={() => setShow(true)}
				>
					Add Booking
				</button>
			</div>
			<Modal show={show} close={setShow}>
				<Booking update={update} setUpdate={setUpdate} method="post" />
			</Modal>
		</React.Fragment>
	);
};

const Action = ({ _id, update, setUpdate }) => {
	const [show, setShow] = useState(false);
	const deleteEntry = async () => {
		try {
			await axios({
				method: "delete",
				url: "/api/rooms/booking",
				data: { _id },
			});
			setUpdate(update + 1);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<React.Fragment>
			<Modal show={show} close={setShow}>
				<Booking
					update={update}
					setUpdate={setUpdate}
					method="put"
					_id={_id}
				/>
			</Modal>
			<ul className="list-inline m-0">
				<li className="list-inline-item">
					<button
						className="btn btn-success btn-sm rounded-0"
						type="button"
						title="Edit"
						onClick={() => setShow(true)}
					>
						Edit
					</button>
				</li>
				<li className="list-inline-item">
					<button
						className="btn btn-danger btn-sm rounded-0"
						type="button"
						title="Delete"
						onClick={() => deleteEntry()}
					>
						Remove
					</button>
				</li>
			</ul>
		</React.Fragment>
	);
};

import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Modal from "./Modal";
import Input from "../utils/Input";
import Alerts from "../utils/Alerts";
import ButtonSpin from "../utils/ButtonSpin";

export default function Dashboard({ auth }) {
	return (
		<div className="custom-center">
			<div className="container">
				<div className="card h-100">
					<div className="card-body w-100">
						<nav className="nav nav-tabs">
							<NavLink className="nav-link" exact to="/dashboard">
								Home
							</NavLink>
							<NavLink
								className="nav-link"
								exact
								to="/dashboard/booking"
							>
								Booking
							</NavLink>
						</nav>
						<Switch>
							<Route exact path="/dashboard">
								<Table />
							</Route>
							<Route exact path="/dashboard/booking">
								<AddBooking auth={auth} />
							</Route>
							<Route path="*">
								<Redirect to="/" />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
}

const Table = () => {
	const [update, setUpdate] = useState(false);
	const [_id, set_id] = useState();
	const [data, setData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get("/api/rooms/booking");
				setData([...data]);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, [update]);
	const deleteEntry = async (_id) => {
		try {
			await axios({
				method: "delete",
				url: "/api/rooms/booking",
				data: { _id },
			});
			setUpdate(!update);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<React.Fragment>
			<Modal show={showModal} close={setShowModal} title="Edit Booking">
				<EditBooking _id={_id} update={update} setUpdate={setUpdate} />
			</Modal>
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
								<button
									className="btn btn-primary btn-sm"
									type="button"
									title="Edit"
									onClick={() => {
										set_id(data._id);
										setShowModal(true);
									}}
								>
									Edit
								</button>
								<button
									className="btn btn-secondary btn-sm ml-3"
									type="button"
									title="Remove"
									onClick={() => deleteEntry(data._id)}
								>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
};

const EditBooking = ({ update, setUpdate, _id }) => {
	const { register, handleSubmit, errors, watch } = useForm();

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
			await axios({
				method: "put",
				url: "/api/rooms/booking",
				data: { ...data, _id },
			});

			setUpdate(!update);
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

const AddBooking = ({ auth }) => {
	const { register, handleSubmit, errors, watch } = useForm();

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
			await axios.post("/api/rooms/booking", data);
			setAlert({
				status: true,
				message: "Booking Successfull",
				color: "success",
			});
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
	const [data, setData] = useState({});
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get("/api/users/info");
				setData({ ...data });
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="row row-cols-2">
			<div className="col-4">
				<div className="card">
					<div className="card-header bg-primary text-white">
						Add a booking
					</div>
					<div className="card-body">
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
											new Date(value) >=
												new Date(watchStartDate) ||
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
								<label
									htmlFor="roomType"
									className="form-label"
								>
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
					</div>
				</div>
			</div>
			<div className="col-4">
				<div className="card text-center">
					<div className="card-body">
						<h3>Room Rates:</h3>
						<h5>Single: Php 800.00</h5>
						<h5>Family: Php 1400.00</h5>
						<h5>Deluxe: Php 2000.00</h5>
					</div>
				</div>
			</div>
			<div className="col-4">
				<div className="card text-center">
					<div className="card-body">
						<img
							src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
							alt="avatar"
							className="avatar"
						/>

						<h2>{data.name}</h2>

						<p>
							<strong>Email: </strong>
							{data.email}
						</p>

						<p>
							<strong>Created: </strong>{" "}
							{moment.parseZone(data.createdAt).format("LL")}
						</p>
						<button
							className="btn btn-primary w-50 custom-btn"
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
		</div>
	);
};

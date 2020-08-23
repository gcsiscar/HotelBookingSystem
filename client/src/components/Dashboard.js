import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Input from "./utils/Input";
import Alerts from "./utils/Alerts";
import auth from "./utils/auth";

export default function Dashboard() {
	const [update, setUpdate] = useState(0);
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
							<Booking setUpdate={setUpdate} update={update}/>
						</div>
					</div>
				</div>
				<div className="col-8">
					<div className="card mt-3">
						<div className="card-header bg-primary text-white">
							Placeholder Header
						</div>
						<div className="card-body">
							<Table update={update}/>
						</div>
					</div>
				</div>
				<div>
					<button
						onClick={() => {
							auth.signOut(() => {
								document.cookie =
									"; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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

const Booking = ({update, setUpdate}) => {
	const { register, handleSubmit, errors, watch } = useForm();

	const watchStartDate = watch("startDate", Date.now());

	const [alert, setAlert] = useState({
		status: null,
		message: "",
		color: "",
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			const header = {
				headers: { Authorization: `Bearer ${document.cookie}` },
			};
			const res = await axios.post("/api/rooms", data, header);
			console.log(res)
			setUpdate(update + 1)
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
		}
	});
	return (
		<form onSubmit={onSubmit}>
			<div className="mb-3">
				<Input
					label="Check In Date:"
					type="date"
					id="startDate"
					name="startDate"
					errors={errors.startDate}
					className="form-control"
					ref={register({
						required: "This field is required",
						validate: (value) =>
							new Date(value) >= Date.now() ||
							"Cannot book from this date",
					})}
				/>
			</div>
			<div className="mb-3">
				<Input
					label="Check Out Date:"
					type="date"
					id="endDate"
					name="endDate"
					className="form-control"
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
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</div>
			{alert.status && (
				<Alerts
					setAlert={setAlert}
					message={alert.message}
					color={alert.color}
				/>
			)}
		</form>
	);
};

const Table = ({update}) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const header = {
					headers: { Authorization: `Bearer ${document.cookie}` },
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
		<table className="table table-striped table-bordered">
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
				{data.map((data) => (
					<tr key={data._id}>
						<td>{data.startDate}</td>
						<td>{data.endDate}</td>
						<td>{data.room}</td>
						<td>{data.duration}</td>
						<td>@mdo</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

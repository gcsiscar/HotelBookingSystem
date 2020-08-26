import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function AdminDashboard() {
	return (
		<div className="custom-center">
			<div className="container h-100">
				<div className="row h-100 align-items-center justify-content-center">
					<div className="card mb-3">
						<div className="card-body w-100">
							<nav className="nav nav-tabs">
								<NavLink
									className="nav-link"
									exact
									to="/admindashboard"
								>
									Home
								</NavLink>
								<NavLink
									className="nav-link"
									exact
									to="/admindashboard/user"
								>
									User
								</NavLink>
								<NavLink
									className="nav-link"
									exact
									to="/admindashboard/account"
								>
									Account
								</NavLink>
							</nav>
							<Switch>
								<Route exact path="/admindashboard">
									<BookingTable />
								</Route>
								<Route exact path="/admindashboard/user">
									<UserTable />
								</Route>
								<Route path="*">
									<Redirect to="/" />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const BookingTable = () => {
	const [update, setUpdate] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get("/api/rooms/admin");
				setData([...data]);
				console.log(data);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, [update]);

	let parseData = [];
	data.forEach((data) => {
		data.bookings.forEach((data) => parseData.push(data));
	});

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
		<table className="table table-borderless table-responsive table-hover m-0">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Room Name</th>
					<th>Room Type</th>
					<th>Check In</th>
					<th>Check Out</th>
					<th>Days</th>
					<th>Total</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{parseData.map((data, index) => (
					<tr key={index}>
						<td>{data.user_id.name}</td>
						<td>{data.user_id.email}</td>
						<td>{data.room_name}</td>
						<td>{data.room_type}</td>
						<td>{moment.parseZone(data.startDate).format("LL")}</td>
						<td>{moment.parseZone(data.endDate).format("LL")}</td>
						<td>{data.duration}</td>
						<td>{data.total}</td>
						<td>
							<ul className="list-inline m-0">
								<li className="list-inline-item">
									<button
										className="btn btn-secondary btn-sm rounded-0"
										type="button"
										onClick={() => deleteEntry(data._id)}
									>
										Remove
									</button>
								</li>
							</ul>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const UserTable = () => {
	const [update, setUpdate] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get("/api/user/admin");
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
				url: "/api/users/admin",
				data: { _id },
			});
			setUpdate(!update);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<table className="table table-borderless table-responsive table-hover m-0">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Created Date</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{data.map((data, index) => (
					<tr key={index}>
						<td>{data.name}</td>
						<td>{data.email}</td>
						<td>{moment.parseZone(data.createdAt).format("LL")}</td>
						<td>
							<ul className="list-inline m-0">
								<li className="list-inline-item">
									<button
										className="btn btn-secondary btn-sm rounded-0"
										type="button"
										onClick={() => deleteEntry(data._id)}
									>
										Remove
									</button>
								</li>
							</ul>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

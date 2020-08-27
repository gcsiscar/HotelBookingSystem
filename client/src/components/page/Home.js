import React from "react";
import image from "../img/booking.svg";
import { NavLink } from "react-router-dom";

export default function Home() {
	return (
		<header className="custom-center bg-white">
			<div className="container h-100">
				<div className="row row-cols-2 h-100 align-items-center">
					<div className="col">
						<h1>Welcome To</h1>
						<h1>Hotel Booking System</h1>
						<p className="lead">
							A web-based application that allows the user to
							login from anywhere to easily, accurately and
							quickly make room bookings.
						</p>
						<NavLink to="/dashboard" className="btn btn-primary btn-lg w-50 custom-btn">
							Start Booking
						</NavLink>
					</div>
					<div className="col">
						<img src={image} className="img-fluid" alt="..." />
					</div>
				</div>
			</div>
		</header>
	);
}

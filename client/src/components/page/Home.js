import React from "react";
import image from "../img/booking.svg";

export default function Home() {
	return (
		<header className="custom-center bg-white">
			<div className="container h-100">
				<div className="row row-cols-2 h-100 align-items-center">
					<div className="col">
						<h1>Welcome To</h1>
						<h1>Hotel Booking System</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Repellendus ab nulla dolorum autem nisi
							officiis blanditiis voluptatem hic, assumenda
							aspernatur facere ipsam nemo ratione cumque magnam
							enim fugiat reprehenderit expedita.
						</p>
						<button className="btn btn-primary btn-lg w-50 custom-btn">
							Start Booking
						</button>
					</div>
					<div className="col">
						<img src={image} className="img-fluid" alt="..." />
					</div>
				</div>
			</div>
		</header>
	);
}

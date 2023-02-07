import React from "react";
import Img1 from "../images/books/img1.png";
import Img5 from "../images/books/img6.png";
import Bmg1 from "../images/backgrounds/img9.png";
function MainPage() {
	return (
		<div>
			<div className="py-5"></div>
			<div className="row mx-0 justify-content-end align-items-center">
				<div className="col-5">
					<p className="lead fs-1">
						Welcome to ReadUp, the ultimate destination for book
						lovers.
					</p>
				</div>
				<div className="col-5 p-5">
					<img src={Img1} className="img-fluid" alt="..." />
				</div>
			</div>
			<div
				className="card bg-dark border-0 rounded-0 text-white h-30"
				style={{ height: "30vh", overflow: "clip" }}
			>
				<img src={Bmg1} className="card-img" alt="..." />
				<div
					className="card-img-overlay"
					style={{ background: "#00000028" }}
				>
					<p className="card-text fs-2 p-4 text-center">
						Join a community of avid readers who share their
						thoughts, opinions, and insights on their favorite
						books.
					</p>
				</div>
			</div>
			
			<div className="card bg-dark rounded-0 border-0 text-white h-100 ">
				<img src={Img5} className="card-img" alt="..." />
				<div
					className="card-img-overlay row mx-0 align-items-center"
					style={{ background: "#000000b4" }}
				>
					<h5 className="card-title fs-1 fw-bold">
						Your Personal Library
					</h5>
					<p className="card-text fs-3">
						Welcome to Your Personal Library - Your One-Stop
						Destination for All Your Reading Adventures! With a
						wealth of books at your fingertips, you can now keep
						track of all the books you've read, want to read, and
						are currently reading. So, come join us on this literary
						journey and create a virtual bookshelf that truly
						reflects your love for reading.
					</p>
					<p className="card-text">
						<span className="text-success">3000</span> books
						recorded
					</p>
				</div>
			</div>
			<div className="pt-4 fs-1">
				<span className="text-danger">Most</span> Popular Books
			</div>
			<div className="row justify-content-even align-items-center g-5 p-4 mx-0">
				<div className="col">
					<div className="card bg-dark text-white border-0 shadow">
						<img src={Img1} className="card-img" alt="..." />
						<div className="card-img-overlay over">
							<div>
								<h5 className="card-title">Card title</h5>
								<p className="card-text">
									This is a wider card with supporting text
									below as a natural lead-in to additional
									content. This content is a little bit
									longer.
								</p>
								<p className="card-text">
									Last updated 3 mins ago
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card bg-dark text-white border-0 shadow">
						<img src={Img1} className="card-img" alt="..." />
						<div className="card-img-overlay over">
							<div>
								<h5 className="card-title">Card title</h5>
								<p className="card-text">
									This is a wider card with supporting text
									below as a natural lead-in to additional
									content. This content is a little bit
									longer.
								</p>
								<p className="card-text">
									Last updated 3 mins ago
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card bg-dark text-white border-0 shadow">
						<img src={Img1} className="card-img" alt="..." />
						<div className="card-img-overlay over">
							<div>
								<h5 className="card-title">Card title</h5>
								<p className="card-text">
									This is a wider card with supporting text
									below as a natural lead-in to additional
									content. This content is a little bit
									longer.
								</p>
								<p className="card-text">
									Last updated 3 mins ago
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPage;

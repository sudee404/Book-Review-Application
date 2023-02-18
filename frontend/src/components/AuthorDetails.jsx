import React, { useState, useEffect } from 'react';
import { LoaderMini } from './Loader';

const AuthorDetails = ({ authorId }) => {

	const [author, setAuthor] = useState()

	useEffect(() => {
		fetch(`https://openlibrary.org/authors/${authorId}.json`)
			.then(response => response.json())
			.then(data => setAuthor(data));


	}, [authorId]);

	if (!author) {
		return <div><LoaderMini /> </div>;
	}
	return (
		<>
			<div className="card mb-3">
				<div className="card-body">
					<p className="card-text text-success">Name:</p>
					<h5 className="card-title fw-bold">{author.name || 'Not Specified'}</h5>
					<p className="card-text text-primary">Bio:</p>
					<p className="card-text">{typeof author.bio === 'object' ? author.bio.value || 'Not Specified' : author.bio || 'Not Specified'}</p>
					<p className="card-text text-info">Date of Birth:</p>
					<p className="card-text">
						<small className="text-muted">
							{author.birth_date
								? new Date(author.birth_date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})
								: 'Not Specified'}
						</small>
					</p>
				</div>
			</div>
		</>
	);
};

export default AuthorDetails;

import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ClubModal from './ClubModal';

export default function ClubCard({ club }) {
	const [shadow, setShadow] = useState('md');
	const [activeTab, setActiveTab] = useState('1');

	const handleTabClick = (e) => {
		e.preventDefault();
		setActiveTab(e.target.dataset.tab);
	};

	return (
		<div className='col'>
			<Card textAlign={'center'} shadow={'md'} _hover={{shadow:'dark-lg',fontWeight:'bold',fontcolor:'blue'}} variant={'filled'}>
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === '1' ? 'active' : ''}`}
								href="#"
								data-tab="1"
								onClick={handleTabClick}
							>
								Name
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
								href="#"
								data-tab="2"
								onClick={handleTabClick}
							>
								Description
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${activeTab === '3' ? 'active' : ''}`}
								href="#"
								data-tab="3"
								onClick={handleTabClick}
							>
								Join
							</a>
						</li>
					</ul>
				</div>
				<div className="card-body p-2 p-lg-5">
					{activeTab === '1' && (
						<>
							<Heading color={'rosybrown'}>
								{club.name}
							</Heading>
						</>
					)}
					{activeTab === '2' && (
						<>
							<div className="lead">{club.description}Some quick example text to build on the card title and make up the bulk of the card's
								content.</div>
						</>
					)}
					{activeTab === '3' && (
						<>
							<ClubModal club={club}/>
						</>
					)}
				</div>
			</Card>
		</div>
	);
}

import { Card, Heading, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import ClubModal from './ClubModal';

export default function ClubCard({ club }) {
	const [activeTab, setActiveTab] = useState('1');

	const handleTabClick = (e) => {
		e.preventDefault();
		setActiveTab(e.target.dataset.tab);
	};

	return (
		<div className='col'>
			<Card textAlign={'center'} bg={'bisque'} shadow={'md'} _hover={{shadow:'dark-lg',fontWeight:'bold',fontcolor:'blue'}} variant={'filled'}>
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">
						<li className="nav-item">
							<Link
								className={`nav-link ${activeTab === '1' ? 'active' : ''}`}
								data-tab="1"
								onClick={handleTabClick}
							>
								Name
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
								data-tab="2"
								onClick={handleTabClick}
							>
								Description
							</Link>
						</li>
						
					</ul>
				</div>
				<div className="card-body p-2 p-lg-5">
					{activeTab === '1' && (
						<>
							<Heading color={'rosybrown'}>
								{club.name}
							</Heading>
							<div className="p-3 text-center">
								<ClubModal club={club} />
							</div>
						</>
					)}
					{activeTab === '2' && (
						<>
							<div className="lead">{club.description}</div>
						</>
					)}
					
				</div>
			</Card>
		</div>
	);
}

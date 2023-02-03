import React, { useState } from 'react';
import {
	MDBContainer,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane
}
	from 'mdb-react-ui-kit';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function UserForm() {

	const [justifyActive, setJustifyActive] = useState('tab1');;

	const handleJustifyClick = (value) => {
		if (value === justifyActive) {
			return;
		}
		setJustifyActive(value);
	};

	return (
		<MDBContainer className="p-3 my-5 d-flex flex-column  w-sm-90 w-lg-50">

			<MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between align-items-center mx-0'>
				<MDBTabsItem>
					<MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
						Login
					</MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
					<MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
						Register
					</MDBTabsLink>
				</MDBTabsItem>
			</MDBTabs>

			<MDBTabsContent>

				<MDBTabsPane show={justifyActive === 'tab1'}>
					<LoginForm />
				</MDBTabsPane>

				<MDBTabsPane show={justifyActive === 'tab2'}>
					<RegisterForm />
				</MDBTabsPane>

			</MDBTabsContent>

		</MDBContainer>
	);
}


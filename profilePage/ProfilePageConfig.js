import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {
				footer: {
					display: false
				},
			}
		}
	},
	routes: [
		{
			path: '/profile',
			component: React.lazy(() => import('./ProfilePage'))
		}
	]
};

export default ProfilePageConfig;

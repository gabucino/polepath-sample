import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	activityContainer: {
		padding: 0,
		margin: 0,
		minHeight: '400px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'

	}
}));

const UserHistory = props => {
	const classes = useStyles(props);

	const routerHistory = useHistory();

	const [activity, setActivity] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const routeChange = id => {
		let path = `/moves/polemoves/${id}`;
		routerHistory.push(path);
	};

	useEffect(() => {
		const source = axios.CancelToken.source();

		//fetch data
		axios
			.get(`${process.env.REACT_APP_API_PATH}/users/history`, {
				cancelToken: source.token
			})
			.then(resp => {
				const reverseActivity = resp.data.activity.reverse()
				setActivity(reverseActivity);
				setLoading(false);
			})
			.catch(err => {
				setError(true);
			});

		return () => {
			source.cancel('Component got unmounted');
		};
	}, []);

	const errorMessage = (
		<Typography variant="h6" className="mb-16">
			Couldn't load latest activity :(
		</Typography>
	);

	return (
		<div className="flex flex-col justify-center items-center mx-8 mt-20 border-1 p-0 rounded-8 ">
			<Typography variant="h6" className="mb-16">
				Latest Activity
			</Typography>
			<Container className={classes.activityContainer}>
				{loading ? (
					<CircularProgress />
				) : error ? (
					errorMessage
				) : (
					activity.map((item, i) => {
						let itemText;
						switch (item.event) {
							case 'photo':
								itemText = `You added a new  ${item.polemoveId.name} ${item.event}.`;
								break;
							case 'mastered':
								itemText = `Congratulations! You mastered the ${item.polemoveId.name} move.`;
								break;
							case 'started':
								itemText = `You started to learn the ${item.polemoveId.name} move. Good luck!`;
								break;
							default:
								return true;
						}

						return (
							<div
								key={item._id}
								className="flex justify-center mb-8 w-full flex-col border-0 bg-gray-100 cursor-pointer"
								onClick={() => routeChange(item.polemoveId._id)}
							>
								<Typography className="mb-16 pl-16" variant="subtitle1">
									{itemText}
								</Typography>{' '}
								<Typography variant="caption" display="block" gutterBottom className="text-right pr-8">
									{moment(item.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
								</Typography>
								{i !== activity.length - 1 && <Divider light />}
							</div>
						);
					})
				)}
			</Container>
		</div>
	);
};

export default UserHistory;

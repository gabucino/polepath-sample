import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	counter: {
		color: theme.palette.primary.main
	}
}));

function CounterWidget(props) {
	const classes = useStyles();

	return (
		<Paper className="w-full rounded-8 shadow-none border-1 mx-8">
			<div className="text-center pt-6 pb-6">
				<Typography className={clsx(classes.counter, 'text-72 leading-none ')}>{props.count}</Typography>
			</div>
			<div className="flex items-center px-16 h-52 border-t-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">{props.label}</span>
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(CounterWidget);

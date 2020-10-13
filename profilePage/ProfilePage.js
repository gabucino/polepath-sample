import React, { useState, useEffect, Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import ChangeStageName from './ChangeStageName';
import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import CropperPage from './CropperPage';


import CounterWidget from './CounterWidget';
import UserHistory from './UserHistory';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},
	avatar: {
		cursor: 'pointer'
	}
}));

function ProfilePage(props) {
	const classes = useStyles();

	const [changeNameDialog, setChangeNameDialog] = useState(false);
	const [popoverAnchor, setPopoverAnchor] = useState(null);

	const [workingOnCount, setWorkingOnCount] = useState(0);

	const [uploadedPic, setUploadedPic] = useState(null);

	const user = useSelector(({ auth }) => auth.user);
	const progresses = useSelector(({ moves }) => moves.progress);

	useEffect(() => {
		if (progresses) {
			const masteredArr = progresses.data.filter(progress => progress.mastered === true);
			setWorkingOnCount(masteredArr.length);
		}
	}, [progresses]);

	const handleUploadPicture = e => {
		if (e.target.files) {
			setUploadedPic(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<Fragment>
					<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
						<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Avatar
									className={`mb-16 w-96 h-96 ${classes.avatar}`}
									src={user.photoURL}
									onClick={e => {
										setPopoverAnchor(e.currentTarget);
									}}
								/>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="md:mx-24" variant="h4" color="inherit">
									{user.stageName}
									<EditIcon
										className="ml-8 cursor-pointer"
										fontSize="small"
										onClick={() => setChangeNameDialog(true)}
									/>
								</Typography>
							</FuseAnimate>
						</div>
						{popoverAnchor && (
							<Popover
								open={Boolean(popoverAnchor)}
								anchorEl={popoverAnchor}
								onClose={() => setPopoverAnchor(null)}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
							>
								<MenuItem role="button" component="label">
									Update Profile Picture{' '}
									<input type="file" onChange={handleUploadPicture} style={{ display: 'none' }} />
								</MenuItem>
							</Popover>
						)}
					</div>
				</Fragment>
			}
			content={
				<div className="p-16 sm:p-24">
					<ChangeStageName
						action="confirm"
						open={changeNameDialog}
						close={() => setChangeNameDialog(false)}
					/>
					<div className="flex justify-between ">
						{<CounterWidget count={workingOnCount} label="Moves Mastered" />}
						{<CounterWidget count={progresses.data.length} label="Moves Started" />}
					</div>
					<UserHistory />{' '}
					{uploadedPic && (
						<CropperPage open={Boolean(uploadedPic)} src={uploadedPic} close={() => setUploadedPic(null)} />
					)}
				</div>
			}
		/>
	);
}



export default ProfilePage;

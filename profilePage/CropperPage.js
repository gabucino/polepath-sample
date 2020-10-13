import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core';

import { updatePhoto } from '../../store/actions/';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	cropContainer: {
		width: '100%',
		height: '400px',
		padding: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	dialogPaper: {
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '10 auto',
		minHeight: '85vh',
		maxHeight: '85vh',
		minWidth: '82vw',
		maxWidth: '85vw',
		justifyContent: 'space-evenly',
		[theme.breakpoints.up('sm')]: {
			minWidth: '70vw',
			maxWidth: '70vw'
		},
		[theme.breakpoints.up('md')]: {
			minWidth: '55vw',
			maxWidth: '55vw'
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: '30vw'
		}
	}
}));

const CropperPage = props => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [blob, setBlob] = useState(null);
	const [mounted, setMounted] = useState(false);

	const photoURL = useSelector(({ auth }) => auth.user.photoURL);

	const imgRef = useRef(null);

	useEffect(() => {
		if (!mounted) return;
		const cropper = new Cropper(imgRef.current, {
			viewMode: 2,
			zoomable: false,
			scalable: false,
			aspectRatio: 1,
			highlight: false,
			background: false,
			center: false,
			guides: false,
			crop: () => {
				const canvas = cropper.getCroppedCanvas();
				canvas.toBlob(blob => {
					setBlob(blob);
				});
			}
		});
	}, [props.src, mounted]);

	useEffect(() => {
		if (mounted) props.close();
	}, [props, photoURL]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSubmit = async () => {
		setBlob(null);
		const formData = new FormData();
		formData.append('image', blob);

		dispatch(updatePhoto(formData));
	};

	return (
		<Dialog open={props.open} onClose={props.close}>
			<Container className={classes.dialogPaper}>
				<DialogTitle className="text-center">Crop your photo</DialogTitle>
				<Container className={classes.cropContainer}>
					<img src={props.src} ref={imgRef} alt="Crop Area" className="max-h-full max-w-full block" />
				</Container>
				<DialogActions className="flex justify-end">
					<Button color="primary" disabled={!blob} type="button" onClick={handleSubmit}>
						Save
					</Button>
					<Button color="primary" type="button" onClick={props.close}>
						Cancel
					</Button>
				</DialogActions>
			</Container>
		</Dialog>
	);
};

export default CropperPage;

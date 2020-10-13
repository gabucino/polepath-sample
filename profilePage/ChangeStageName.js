import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import * as Actions from 'app/store/actions/';
import { useDispatch, useSelector } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';

export default function ChangeStageName(props) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const stageName = useSelector(({ auth }) => auth.user.stageName);

	const submitHandler = async model => {
		setLoading(true);
		dispatch(Actions.updateStageName(model.stageName));
	};

	useEffect(() => {
		//makes sure not to run it on initial render
		if (loading) {
			setLoading(false);
			props.close();
		}
	}, [stageName, props]);

	return (
		<Fragment>
			<Dialog
				className="flex flex-col align-center"
				open={props.open}
				onClose={props.close}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Change your stage name</DialogTitle>
				<Formsy
					onValidSubmit={submitHandler}
					onValid={() => setIsValid(true)}
					onInvalid={() => setIsValid(false)}
					className="px-16 pb-16 flex flex-col justify-center w-full items-center"
				>
					<TextFieldFormsy
						className="my-16"
						type="text"
						name="stageName"
						label="Your new stagename"
						multiline
						validations={{
							minLength: 3
						}}
						validationErrors={{
							minLength: 'Minimum character length is 3'
						}}
						variant="outlined"
						required
						value=""
					/>
					<Container className="flex justify-end">
						<Button onClick={props.close} variant="contained" color="secondary">
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="secondary" disabled={loading || !isValid}>
							Submit
						</Button>
					</Container>
				</Formsy>
			</Dialog>
		</Fragment>
	);
}

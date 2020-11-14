import React, { useState } from 'react';
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

	const [isValid, setIsValid] = useState(false);

	const loading = useSelector(({ fuse }) => fuse.loading);
	const isOpen = useSelector(({ fuse }) => fuse.dialog.isOpen);

	const submitHandler = model => {
		dispatch(Actions.updateStageName(model.stageName));
	};


	return (
			<Dialog
				className="flex flex-col align-center"
				open={isOpen}
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
						<Button type="submit" variant="contained" color="secondary" disabled={loading.isLoading || !isValid}>
							Submit
						</Button>
					</Container>
				</Formsy>
			</Dialog>
	);
}

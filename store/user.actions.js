import { showMessage } from 'app/store/actions/fuse';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';

export const UPDATE_PHOTO = '[USER] UPDATE PHOTO';
export const UPDATE_STAGENAME = '[USER] UPDATE STAGE NAME';

export function setUserData(data) {
	return {
		type: SET_USER_DATA,
		payload: data
	};
}

export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

export function updatePhoto(formData) {
	const request = axios.post(`${process.env.REACT_APP_API_PATH}/users/changeavatar`, formData);
	return dispatch => {
		dispatch(startLoading());
		request
			.then(resp => {
				dispatch({
					type: UPDATE_PHOTO,
					payload: resp.data.photoURL
				});
				dispatch(stopLoading());
				dispatch(showMessage({ message: 'Your photo has been uploaded. Beautiful!', variant: 'success' }));
				dispatch(closeDialog())
			})
			.catch(err => {
				dispatch(stopLoading());
				dispatch(showMessage({ message: err.response.data.message, variant: 'error' }));
			});
	};
}

export function updateStageName(stageName) {
	const request = axios.post(`${process.env.REACT_APP_API_PATH}/users/changestagename`, {
		stageName: stageName
	});
	return dispatch => {
		dispatch(startLoading('stageNameChange'));
		request
			.then(result => {
				dispatch({
					type: UPDATE_STAGENAME,
					payload: stageName
				});
				dispatch(stopLoading());
				dispatch(closeDialog())

			})
			.catch(err => {
				dispatch(stopLoading());
				dispatch(
					showMessage({ message: 'Something has gone wrong :( Please try again later.', variant: 'error' })
				);
			});
	};
}

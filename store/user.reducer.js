import * as Actions from '../../actions/auth'

const initialState = {
  role: [], // guest
  _id: null,
  stageName: 'Guest',
  photoURL: '',
  email: '',
  token: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload,
      }
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      }
    }
    case Actions.UPDATE_PHOTO: {
      return {
        ...state,
        photoURL: action.payload,
      }
    }
    case Actions.UPDATE_STAGENAME: {
      return {
        ...state,
        stageName: action.payload,
      }
    }
  }
}

export default user

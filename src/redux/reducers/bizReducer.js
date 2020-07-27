import {
	FETCHING_BIZS_REQUEST,
	FECTHING_BIZS_SUCCESS,
	FECTHING_BIZS_FAILURE,
} from "../actions/types";

const initialState = {
	isFetching: false,
	errorMessage: "",
	businesses: [],
};

const bizReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_BIZS_REQUEST:
			return { ...state, isFetching: true };
		case FECTHING_BIZS_FAILURE:
			return { ...state, isFetching: false, errorMessage: action.payload };
		case FECTHING_BIZS_SUCCESS:
			return {
				...state,
				isFetching: false,
				people: action.payload,
			};
		default:
			return state;
	}
};

export default bizReducer;

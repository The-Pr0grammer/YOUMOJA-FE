import {
	FETCHING_BIZS_REQUEST,
	FETCHING_BIZS_SUCCESS,
	FETCHING_BIZS_FAILURE,
	FETCHING_COMMENTS_REQUEST,
	FETCHING_COMMENTS_SUCCESS,
	FETCHING_COMMENTS_FAILURE,
	POSTING_COMMENT_REQUEST,
	POSTING_COMMENT_SUCCESS,
	POSTING_COMMENT_FAILURE,
} from "../actions/types";

const initialState = {
	isFetching: false,
	errorMessage: "",
	businesses: [],
	comments: [],
};

const bizReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_BIZS_REQUEST:
			return { ...state, isFetching: true };
		case FETCHING_BIZS_FAILURE:
			return { ...state, isFetching: false, errorMessage: action.payload };
		case FETCHING_BIZS_SUCCESS:
			return {
				...state,
				isFetching: false,
				businesses: action.payload,
			};
		case FETCHING_COMMENTS_REQUEST:
			return { ...state, isFetching: true };
		case FETCHING_COMMENTS_FAILURE:
			return { ...state, isFetching: false, errorMessage: action.payload };
		case FETCHING_COMMENTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: action.payload,
			};
		case POSTING_COMMENT_REQUEST:
			return { ...state, isFetching: true };
		case POSTING_COMMENT_FAILURE:
			return { ...state, isFetching: false, errorMessage: action.payload };
		case POSTING_COMMENT_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: [action.payload, ...state.comments],
			};
		default:
			return state;
	}
};

export default bizReducer;

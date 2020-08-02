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
	CHANGE_CAT,
	HANDLE_SEARCH,
	SORT_BY_LIKES_TOGG,
	SORT_BY_BADGES_TOGG,
	SORT_BY_LOCATION_TOGG,
} from "../actions/types";

const initialState = {
	isFetching: false,
	errorMessage: "",
	businesses: [],
	comments: [],
	category: "",
	search: "",
	likesSort: false,
	badgesSort: false,
	locationSort: false,
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
		case CHANGE_CAT:
			return action.payload == "All Categories"
				? { ...state, category: "" }
				: { ...state, category: action.payload };
		case HANDLE_SEARCH:
			return action.payload == ""
				? { ...state, search: "" }
				: { ...state, search: action.payload };
		case SORT_BY_LIKES_TOGG:
			return { ...state, likesSort: !state.likesSort };
		case SORT_BY_BADGES_TOGG:
			return { ...state, badgesSort: !state.badgesSort };
		case SORT_BY_LOCATION_TOGG:
			return { ...state, locationSort: !state.locationSort };
		default:
			return state;
	}
};

export default bizReducer;

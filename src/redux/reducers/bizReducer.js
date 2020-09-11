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
	SORT_BY_HEARTS_TOGG,
	SORT_BY_BADGES_TOGG,
	SORT_BY_LOCATION_TOGG,
	SET_USER_INFO,
	SET_IS_FETCHING,
	HANDLE_REFRESH,
	SORT_BY_SCORES_TOGG,
} from "../actions/types";

const initialState = {
	isFetching: false,
	errorMessage: "",
	businesses: [],
	comments: [],
	category: "",
	search: "",
	heartsSort: false,
	badgesSort: false,
	locationSort: false,
	scoresSort: true,
	userInfo: {},
	userHearts: [],
	userBizs: [],
};

const bizReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_BIZS_REQUEST:
			// console.log("$ is", action.payload);
			return action.payload
				? {
						...state,
						isFetching: action.payload,
				  }
				: {
						...state,
						isFetching: false,
				  };
		case FETCHING_BIZS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case FETCHING_BIZS_SUCCESS:
			return {
				...state,
				isFetching: false,
				businesses: action.payload,
			};
		case FETCHING_COMMENTS_REQUEST:
			return action.payload
				? {
						...state,
						isFetching: action.payload,
				  }
				: {
						...state,
						isFetching: false,
				  };
		case FETCHING_COMMENTS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case FETCHING_COMMENTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: action.payload,
			};
		case POSTING_COMMENT_REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case POSTING_COMMENT_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case POSTING_COMMENT_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: [action.payload, ...state.comments],
			};
		case CHANGE_CAT:
			return action.payload == "All Categories"
				? {
						...state,
						category: "",
				  }
				: {
						...state,
						category: action.payload,
				  };
		case HANDLE_SEARCH:
			return action.payload == ""
				? {
						...state,
						search: "",
				  }
				: {
						...state,
						search: action.payload,
				  };
		case SORT_BY_HEARTS_TOGG:
			return {
				...state,
				heartsSort: !state.heartsSort,
			};
		case SORT_BY_BADGES_TOGG:
			return {
				...state,
				badgesSort: !state.badgesSort,
			};
		case SORT_BY_LOCATION_TOGG:
			return {
				...state,
				locationSort: !state.locationSort,
			};
		case SET_USER_INFO:
			// console.log("reducing➗🔇");
			return {
				...state,
				userInfo: {
					id: action.payload.id,
					email: action.payload.email,
					name: action.payload.name,
					username: action.payload.username,
					img_url: action.payload.img_url,
				},
				userHearts: action.payload.user_hearts,
				userBizs: action.payload.user_bizs,
			};
		case SET_IS_FETCHING:
			// console.log("reducing isFetching");
			return {
				...state,
				isFetching: action.payload,
			};
		case HANDLE_REFRESH:
			// console.log("reducing handleRefresh");
			return {
				...state,
				category: "",
				search: "",
				heartsSort: false,
				badgesSort: false,
				locationSort: false,
			};
		case SORT_BY_SCORES_TOGG:
			// console.log("reducing scores sort")
			return action.payload
				? {
						...state,
						scoresSort: true,
				  }
				: {
						...state,
						scoresSort: !state.scoresSort,
				  };

		default:
			return state;
	}
};

export default bizReducer;

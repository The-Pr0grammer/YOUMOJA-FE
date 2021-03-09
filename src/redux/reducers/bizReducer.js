import {
	FETCH_BIZS_REQUEST,
	FETCH_BIZS_SUCCESS,
	FETCH_BIZS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_FAILURE,
	POST_COMMENT_REQUEST,
	POST_COMMENT_SUCCESS,
	POST_COMMENT_FAILURE,
	FETCH_BADGE_SUMS_REQUEST,
	FETCH_BADGE_SUMS_SUCCESS,
	FETCH_BADGE_SUMS_FAILURE,
	CHANGE_CAT,
	HANDLE_SEARCH,
	SORT_BY_HEARTS_TOGG,
	SORT_BY_BADGES_TOGG,
	SORT_BY_LOCATION_TOGG,
	SORT_BY_SCORES_TOGG,
	SET_USER_INFO,
	SET_IS_FETCHING,
	HANDLE_REFRESH,
	PROFILE_LOADING_TOGG,
} from "../actions/types";

const initialState = {
	isFetching: false,
	errorMessage: "",
	ubizs: [],
	comments: [],
	category: "",
	search: "",
	heartsSort: false,
	badgesSort: false,
	locationSort: false,
	scoresSort: true,
	userInfo: {},
	userHearts: [],
	myUbizs: [],
	profileLoading: true,
	badgeSums: [],
};

const bizReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BIZS_REQUEST:
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
		case FETCH_BIZS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case FETCH_BIZS_SUCCESS:
			return {
				...state,
				ubizs: [...action.payload],
				isFetching: false,
			};
		case FETCH_COMMENTS_REQUEST:
			return action.payload
				? {
						...state,
						isFetching: action.payload,
				  }
				: {
						...state,
						isFetching: false,
				  };
		case FETCH_COMMENTS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: action.payload,
			};
		case POST_COMMENT_REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case POST_COMMENT_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case POST_COMMENT_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: [action.payload, ...state.comments],
			};
		case FETCH_BADGE_SUMS_REQUEST:
			return { ...state };
		case FETCH_BADGE_SUMS_FAILURE:
			return {
				...state,
				errorMessage: action.payload,
			};
		case FETCH_BADGE_SUMS_SUCCESS:
			return {
				...state,
				badgeSums: [...action.payload],
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
			// console.log("reducing➗🔇", action.payload);
			return {
				...state,
				userInfo: {
					id: action.payload.id,
					email: action.payload.email,
					name: action.payload.name,
					username: action.payload.username,
					img_url: action.payload.img_url,
					image: action.payload.image,
					emailVerified: action.payload.emailVerified,
					opaque: action.payload.opaque,
					timeSent: action.payload.timeSent,
				},
				userHearts: action.payload.user_hearts,
				myUbizs: action.payload.user_bizs,
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
		case PROFILE_LOADING_TOGG:
			console.log("loading action is", state.profileLoading);
			return {
				...state,
				profileLoading: action.payload,
			};

		default:
			return state;
	}
};

export default bizReducer;

import {
	SET_IS_FETCHING,
	HANDLE_SEARCH,
	CHANGE_CAT,
	FETCH_BIZS_REQUEST,
	FETCH_BIZS_SUCCESS,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	POST_COMMENT_REQUEST,
	POST_COMMENT_SUCCESS,
	FETCH_BADGE_SUMS_REQUEST,
	FETCH_BADGE_SUMS_SUCCESS,
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	API_FAILURE,
	SORT_BY_HEARTS_TOGG,
	SORT_BY_BADGES_TOGG,
	SORT_BY_LOCATION_TOGG,
	SORT_BY_SCORES_TOGG,
	PROFILE_LOADING_TOGG,
	HANDLE_REFRESH,
	SET_USER_LISTINGS,
	SET_USER_HEARTS,
	SET_USER_INFO,
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
	profileLoading: true,
	userInfo: {},
	userListings: [],
	userHearts: [],
	badgeSums: [],
};

const bizReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_FETCHING:
			// console.log("reducing isFetching");
			return {
				...state,
				isFetching: action.payload,
			};
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
		case POST_COMMENT_SUCCESS:
			return {
				...state,
				isFetching: false,
				comments: [action.payload, ...state.comments],
			};
		case FETCH_BADGE_SUMS_REQUEST:
			return { ...state };
		case FETCH_BADGE_SUMS_SUCCESS:
			return {
				...state,
				badgeSums: [...action.payload],
			};
		case FETCH_USER_INFO_REQUEST:
			return { ...state };
		case FETCH_USER_INFO_SUCCESS:
			return {
				...state,
				userInfo: action.payload,
			};
		case API_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
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
			// console.log("hearts sort toggle", state.heartsSort);

			return {
				...state,
				heartsSort: !state.heartsSort,
			};
		case SORT_BY_BADGES_TOGG:
			// console.log("badges sort toggle", state.badgesSort);

			return {
				...state,
				badgesSort: !state.badgesSort,
			};
		case SORT_BY_LOCATION_TOGG:
			// console.log("location sort toggle", state.locationSort);

			return {
				...state,
				locationSort: !state.locationSort,
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
			// console.log("loading action is", state.profileLoading);
			return {
				...state,
				profileLoading: action.payload,
			};
		case SET_USER_LISTINGS:
			return {
				...state,
				userListings: action.payload,
			};
		case SET_USER_HEARTS:
			return {
				...state,
				userHearts: action.payload,
			};
		case SET_USER_INFO:
			// console.log("reducing➗🔇", action.payload);
			return {
				...state,
				userInfo: {
					id: action.payload.id,
					name: action.payload.name,
					username: action.payload.username,
					img_url: action.payload.img_url,
					image: action.payload.image,
					linkedin: action.payload.linkedin,
					twitter: action.payload.twitter,
					email: action.payload.email,
					allow_emails: action.payload.allow_emails,
					email_verified: action.payload.email_verified,
					time_sent: action.payload.time_sent,
					badges: action.payload.badges,
					heart_ids: action.payload.heart_ids,
					comment_scores_sum: action.payload.comment_scores_sum,
					opaque: action.payload.opaque,
				},
			};
		default:
			return state;
	}
};

export default bizReducer;

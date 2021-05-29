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
} from "./types";
import axios from "axios";

export const setIsFetching = (togg) => ({
	type: SET_IS_FETCHING,
	payload: togg,
});

export const fetchBizsRequest = (activityIndicator = true) => ({
	type: FETCH_BIZS_REQUEST,
	payload: activityIndicator,
});

export const fetchBizsSuccess = (json) => ({
	type: FETCH_BIZS_SUCCESS,
	payload: json,
});

export const ApiFailure = (error) => ({
	type: API_FAILURE,
	payload: error,
});

export const fetchCommentsRequest = (activityIndicator = true) => ({
	type: FETCH_COMMENTS_REQUEST,
	payload: activityIndicator,
});

export const fetchCommentsSuccess = (json) => ({
	type: FETCH_COMMENTS_SUCCESS,
	payload: json,
});

export const postCommentRequest = () => ({ type: POST_COMMENT_REQUEST });

export const postCommentSuccess = (json) => ({
	type: POST_COMMENT_SUCCESS,
	payload: json,
});

export const fetchBadgeSumsRequest = () => ({
	type: FETCH_BADGE_SUMS_REQUEST,
});

export const fetchBadgeSumsSuccess = (json) => ({
	type: FETCH_BADGE_SUMS_SUCCESS,
	payload: json,
});

export const fetchUserInfoRequest = () => ({
	type: FETCH_USER_INFO_REQUEST,
});

export const fetchUserInfoSuccess = (json) => ({
	type: FETCH_USER_INFO_SUCCESS,
	payload: json,
});

export const fetchBizs = (activityIndicator) => {
	return async (dispatch) => {
		dispatch(fetchBizsRequest(activityIndicator));
		try {
			let response = await axios(`http://192.168.1.211:3000/user_bizs`);
			// let json = await response.json();
			// console.log(response.data);
			await dispatch(fetchBizsSuccess(response.data));
		} catch (error) {
			dispatch(ApiFailure(error));
		}
	};
};

export const fetchComments = (id, activityIndicator) => {
	return async (dispatch) => {
		dispatch(fetchCommentsRequest(activityIndicator));
		try {
			let response = await axios(`http://192.168.1.211:3000/businesses/${id}`, {
				business: { id: `${id}` },
			});
			// let json = await response.json();
			dispatch(fetchCommentsSuccess(response.data.comments));
		} catch (error) {
			dispatch(fetchCommentsFailure(error));
		}
	};
};

export const postComment = (comment) => {
	return async (dispatch) => {
		dispatch(postCommentRequest());
		try {
			let response = await axios
				.post(`http://192.168.1.211:3000/comments`, {
					comment,
				})
				.then((res) => {
					dispatch(fetchComments(res.data.business_id));
				});
			// let json = await response.json();
			dispatch(postCommentSuccess(response.data));
		} catch (error) {
			dispatch(ApiFailure(error));
		}
	};
};

export const fetchBadgeSums = () => {
	return async (dispatch) => {
		dispatch(fetchBadgeSumsRequest());
		try {
			let response = await axios(`http://192.168.1.211:3000/user_bizs/badges`);

			dispatch(fetchBadgeSumsSuccess(response.data));

			// let json = await response.json();
		} catch (error) {
			dispatch(ApiFailure(error));
		}
	};
};

export const fetchUserInfo = (id) => {
	return async (dispatch) => {
		dispatch(fetchUserInfoRequest());
		try {
			let response = await axios(`http://192.168.1.211:3000/users/${id}`);

			dispatch(fetchUserInfoSuccess(response.data));

			// let json = await response.json();
		} catch (error) {
			dispatch(ApiFailure(error));
		}
	};
};

export const changeCat = (cat) => ({
	type: CHANGE_CAT,
	payload: cat,
});

export const handleSearch = (search) => ({
	type: HANDLE_SEARCH,
	payload: search,
});

export const sortByHeartsTogg = () => ({ type: SORT_BY_HEARTS_TOGG });

export const sortByBadgesTogg = () => ({ type: SORT_BY_BADGES_TOGG });

export const sortByLocationTogg = () => ({ type: SORT_BY_LOCATION_TOGG });

export const sortByScoresTogg = (togg) => ({
	type: SORT_BY_SCORES_TOGG,
	payload: togg,
});

export const handleRefresh = () => ({
	type: HANDLE_REFRESH,
});

export const setUserInfo = (user) => ({
	type: SET_USER_INFO,
	payload: user,
});

export const profileLoadingTogg = (togg) => ({
	type: PROFILE_LOADING_TOGG,
	payload: togg,
});

export const setUserListings = (json) => ({
	type: SET_USER_LISTINGS,
	payload: json,
});

export const setUserHearts = (json) => ({
	type: SET_USER_HEARTS,
	payload: json,
});

import {
	SET_IS_FETCHING,
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
	SORT_BY_SCORES_TOGG,
	HANDLE_REFRESH,
	SET_USER_INFO,
	PROFILE_LOADING_TOGG,
	SET_BADGE_COUNTS,
} from "./types";
import axios from "axios";

export const setIsFetching = (togg) => ({
	type: SET_IS_FETCHING,
	payload: togg,
});

export const fetchingBizsRequest = (activityIndicator = true) => ({
	type: FETCHING_BIZS_REQUEST,
	payload: activityIndicator,
});

export const fetchingBizsSuccess = (json) => ({
	type: FETCHING_BIZS_SUCCESS,
	payload: json,
});

export const fetchingBizsFailure = (error) => ({
	type: FETCHING_BIZS_FAILURE,
	payload: error,
});

export const fetchingCommentsRequest = (activityIndicator = true) => ({
	type: FETCHING_COMMENTS_REQUEST,
	payload: activityIndicator,
});

export const fetchingCommentsSuccess = (json) => ({
	type: FETCHING_COMMENTS_SUCCESS,
	payload: json,
});

export const fetchingCommentsFailure = (error) => ({
	type: FETCHING_COMMENTS_FAILURE,
	payload: error,
});

export const postingCommentRequest = () => ({ type: POSTING_COMMENT_REQUEST });

export const postingCommentSuccess = (json) => ({
	type: POSTING_COMMENT_SUCCESS,
	payload: json,
});

export const postingCommentFailure = (error) => ({
	type: POSTING_COMMENT_FAILURE,
	payload: error,
});

export const fetchBizs = (activityIndicator) => {
	return async (dispatch) => {
		dispatch(fetchingBizsRequest(activityIndicator));
		try {
			let response = await axios(`http://192.168.1.211:3000/user_bizs`);
			// let json = await response.json();
			// console.log(response.data);
			await dispatch(fetchingBizsSuccess(response.data));
		} catch (error) {
			dispatch(fetchingBizsFailure(error));
		}
	};
};

export const fetchComments = (id, activityIndicator) => {
	return async (dispatch) => {
		dispatch(fetchingCommentsRequest(activityIndicator));
		try {
			let response = await axios(`http://192.168.1.211:3000/businesses/${id}`, {
				business: { id: `${id}` },
			});
			// let json = await response.json();
			dispatch(fetchingCommentsSuccess(response.data.comments));
		} catch (error) {
			dispatch(fetchingCommentsFailure(error));
		}
	};
};

export const postComment = (comment) => {
	return async (dispatch) => {
		dispatch(postingCommentRequest());
		try {
			let response = await axios
				.post(`http://192.168.1.211:3000/comments`, {
					comment,
				})
				.then((res) => {
					dispatch(fetchComments(res.data.business_id));
				});
			// let json = await response.json();
			dispatch(postingCommentSuccess(response.data));
		} catch (error) {
			dispatch(postingCommentFailure(error));
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



import {
	FETCHING_BIZS_REQUEST,
	FECTHING_BIZS_SUCCESS,
	FECTHING_BIZS_FAILURE,
} from "./types";

export const fetchingBizsRequest = () => ({ type: FECTHING_BIZS_REQUEST });

export const fetchingBizsSuccess = (json) => ({
	type: FECTHING_BIZS_SUCCESS,
	payload: json,
});

export const fetchingBizsFailure = (error) => ({
	type: FECTHING_BIZS_FAILURE,
	payload: error,
});

export const fetchBizs = () => {
	return async (dispatch) => {
		dispatch(fetchingBizsRequest());
		try {
			let response = await axios("http://localhost:3000/user_bizs");
			let json = await response.json();
			dispatch(fetchingBizsSuccess(json.results));
		} catch (error) {
			dispatch(fetchingBizsFailure(error));
		}
	};
};

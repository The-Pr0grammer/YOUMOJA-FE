import AsyncStorage from "@react-native-community/async-storage";

export const getToken = async () => {
	try {
		const value = await AsyncStorage.getItem("@auth_token");
		// console.log("token value is:", value);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		return null;
	}
};

export const setToken = async (token) => {
	console.log("token value will be:", token);

	try {
		await AsyncStorage.setItem("@auth_token", token);
	} catch (e) {
		return null;
	}
};

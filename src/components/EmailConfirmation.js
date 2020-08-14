import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

function EmailConfirmation({ navigation }) {
	
	return (
		<View style={styles.container}>
			<Text>Please Confirm Your Email To</Text>
			<Button
				title="Log In"
				buttonStyle={{
					backgroundColor: "black",
					borderRadius: 18,
				}}
				style={styles.createButton}
				titleStyle={{ color: "red" }}
				onPress={() => console.log(confirmed)}
			/>
		</View>
	);
}

export default EmailConfirmation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: "green",
		height: "100%",
		width: "100%",
	},
});

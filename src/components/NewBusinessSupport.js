import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
	ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import axios from "axios";
import { urlCheck } from "./forms/validation";
import * as WebBrowser from "expo-web-browser";

const NewBusinessSupport = (props) => {
	const [browserResult, setBrowserResult] = useState(0);
	// console.log(props.support);
	return (
		<View style={styles.container}>
			<View style={{ flex: 1, zIndex: 5 }}>
				<TouchableOpacity
					style={{
						borderColor: "black",
						// backgroundColor: "salmon",
						bottom: vh(0.5),
						alignItems: "center",
						justifyContent: "center",
						width: vw(32),
						height: vh(8),
					}}
					onPress={async () => {
						WebBrowser.dismissBrowser();
						// props.setVisibility(!props.visibility);
						// props.setVisibility(false);
						const check = urlCheck(props.support);

						if (check == "clear") {
							await setBrowserResult(
								WebBrowser.openBrowserAsync(props.support)
							);
							console.log(browserResult);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="donate"
						type="font-awesome-5"
						color="green"
						size={40}
						opacity={props.support ? 1 : 0.2}

						// reverse
						// reverseColor="lawngreen"
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				style={{
					position: "relative",
					alignSelf: "flex-end",
					backgroundColor: "maroon",
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					height: vh(8),
					width: vw(66),
					borderBottomWidth: 1,
					opacity: props.purpose == "NewBusiness" ? 0.01 : 1,
				}}
				contentContainerStyle={{
					position: "relative",
					height: vh(8),
					// bottom: vh(0.75),
					// paddingRight: vw(6.6),
					paddingLeft: vw(8),
				}}
				automaticallyAdjustInsets={false}
				horizontal={true}
				// pagingEnabled={true}
				scrollEnabled={false}
				// decelerationRate={2.998}
				// snapToAlignment={"center"}
				// snapToIntervreverseCl={33}
				// scrollEventThrottle={1}
			>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="certificate"
						type="material-community"
						color="green"
						size={45}
						// reverse
						// reverseColor="lawngreen"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="certificate"
						type="material-community"
						color="blue"
						size={45}
						// reverse
						// reverseColor="dodgerblue"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="certificate"
						type="material-community"
						color="firebrick"
						size={45}
						// reverse
						// reverseColor="lightcoral"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="certificate"
						type="material-community"
						color="slateblue"
						size={45}
						// reverse
						// reverseColor="darkmagenta"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="certificate"
						type="material-community"
						color="gold"
						size={45}
						// reverse
						// reverseColor="darkorange"
					/>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default NewBusinessSupport;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderBottomColor: "black",
		width: vw(100),
		position: "relative",
		backgroundColor: "black",
		flexDirection: "row",
	},
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingHorizontal: vw(4.5),
		paddingLeft: vw(10),
		justifyContent: "center",
	},
});

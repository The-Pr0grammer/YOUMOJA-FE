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

const BizPageSupport = (props) => {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={{
						borderColor: "black",
						// backgroundColor: "salmon",
						bottom: vh(0.5),
						alignItems: "center",
						justifyContent: "center",
						width: vw(33),
						height: vh(10),
					}}
					onPress={() => {
						Linking.openURL("https://cash.app/$Issagoattt");
					}}
				>
					<Icon
						name="donate"
						type="font-awesome-5"
						color="green"
						size={40}
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
					height: vh(10),
					width: vw(66),
					borderBottomWidth: 1,
				}}
				contentContainerStyle={{
					position: "relative",
					height: vh(10),
					bottom: vh(0.75),
					// paddingRight: vw(6.6),
					// paddingLeft: vw(4),
				}}
				automaticallyAdjustInsets={false}
				horizontal={true}
				// pagingEnabled={true}
				scrollEnabled={true}
				// decelerationRate={2.998}
				// snapToAlignment={"center"}
				// snapToIntervreverseCl={33}
				// scrollEventThrottle={1}
			>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="award"
						type="font-awesome-5"
						color="green"
						size={27.5}
						reverse
						reverseColor="lawngreen"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="award"
						type="font-awesome-5"
						color="blue"
						size={27.5}
						reverse
						reverseColor="dodgerblue"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="award"
						type="font-awesome-5"
						color="firebrick"
						size={27.5}
						reverse
						reverseColor="lightcoral"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="award"
						type="font-awesome-5"
						color="slateblue"
						size={27.5}
						reverse
						reverseColor="darkmagenta"
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.badge}>
					<Icon
						name="award"
						type="font-awesome-5"
						color="gold"
						size={27.5}
						reverse
						reverseColor="darkorange"
					/>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default BizPageSupport;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		width: vw(100),
		position: "relative",
		backgroundColor: "black",
	},
	badge: {
		height: vh(10),
		// width: vw(24),
		paddingHorizontal: vw(3.5),
	},
});

import React, { useState, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";

const ProfileStats = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();
	return (
		<View
			style={{
				height: vh(35),
				width: vw(100),
				// position: "absolute",
				backgroundColor: "magenta", //MAGENTA
				zIndex: 1,
				// top: vh(7.9),
			}}
		>
			<View
				style={{
					height: vh(36),
					width: vw(100),
					borderWidth: 2,
					position: "absolute",
					alignSelf: "flex-start",
					backgroundColor: "firebrick", //MIDDLE
					justifyContent: "center",
					alignItems: "center",
					zIndex: 1,
					flexDirection: "column",
					// bottom: vh(17.6),
				}}
			>
				<View
					style={{
						height: vh(36),
						width: vw(30),
						borderWidth: 2,
						position: "absolute",
						alignSelf: "flex-start",
						backgroundColor: "black", //LEFT
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "column",
						// bottom: vh(17.6),
						opacity: 0.95,
					}}
				>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							backgroundColor: "maroon",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							height: vh(7.5),
							width: vw(33),
							// borderBottomWidth: 1,
							top: vh(2),
						}}
						contentContainerStyle={{
							position: "relative",
							// height: vh(8),
							// bottom: vh(0.75),
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
								name="certificate"
								type="material-community"
								color="green"
								size={40}
								// reverse
								// reverseColor="lawngreen"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="blue"
								size={40}
								// reverse
								// reverseColor="dodgerblue"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="firebrick"
								size={40}
								// reverse
								// reverseColor="lightcoral"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="slateblue"
								size={40}
								// reverse
								// reverseColor="darkmagenta"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="gold"
								size={40}
								// reverse
								// reverseColor="darkorange"
							/>
						</TouchableOpacity>
					</ScrollView>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 20,
							top: vh(9),
							fontFamily: "Marker Felt",
							color: "lightslategray",
						}}
					>
						1M
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 18,
							top: vh(12.5),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Given
					</Text>

					<ScrollView
						showsHorizontalScrollIndicator={false}
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							backgroundColor: "maroon",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							width: vw(33),
							top: vh(16.95),
						}}
						contentContainerStyle={{
							position: "relative",
							// height: vh(8),
							// bottom: vh(0.75),
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
								name="certificate"
								type="material-community"
								color="green"
								size={40}
								// reverse
								// reverseColor="lawngreen"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="blue"
								size={40}
								// reverse
								// reverseColor="dodgerblue"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="firebrick"
								size={40}
								// reverse
								// reverseColor="lightcoral"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="slateblue"
								size={40}
								// reverse
								// reverseColor="darkmagenta"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="certificate"
								type="material-community"
								color="gold"
								size={40}
								// reverse
								// reverseColor="darkorange"
							/>
						</TouchableOpacity>
					</ScrollView>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 20,
							top: vh(24.4),
							fontFamily: "Marker Felt",
							color: "lightslategray",
						}}
					>
						1M
					</Text>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 18,
							top: vh(27.8),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Received
					</Text>
				</View>
				<Image
					resizeMode={"cover"}
					source={{
						uri: props.userShow.img_url,
					}}
					style={styles.profilePic}
				></Image>
				<View
					style={{
						height: vh(36),
						width: vw(30),
						borderWidth: 2,
						position: "absolute",
						alignSelf: "flex-end",
						backgroundColor: "black", //RIGHT
						// justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "column",
						// bottom: vh(17.6),
						opacity: 0.95,
					}}
				>
					<TouchableOpacity
						style={{
							position: "relative",
							top: vh(2.5),
							height: vh(7.5),
							width: vw(13),
							// backgroundColor: "rgba(0, 0, 0, 0.3)",
							justifyContent: "center",
						}}
					>
						<Icon name="heart" type="feather" color="red" size={35} />
					</TouchableOpacity>
					<Text
						style={{
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 20,
							fontFamily: "Marker Felt",
							top: vh(1.5),
							color: "lightslategray",
						}}
					>
						777K
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 18,
							top: vh(1),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Given
					</Text>
					<TouchableOpacity
						style={{
							position: "absolute",
							// backgroundColor: "maroon",
							// backgroundColor: "rgba(0, 0, 0, 0.3)",
							height: vh(7.5),
							width: vw(30),
							top: vh(17.25),
							justifyContent: "center",
						}}
					>
						<Icon name="heart" type="feather" color="red" size={35} />
					</TouchableOpacity>
					<Text
						style={{
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 20,
							fontFamily: "Marker Felt",
							top: vh(9),
							color: "lightslategray",
						}}
					>
						555K
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 18,
							top: vh(8.55),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Received
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						height: vh(7.5),
						width: vw(42),
						// borderWidth: 2,
						position: "relative",
						alignSelf: "center",
						backgroundColor: "rgba(0,0,0,0.95)", //BLACK
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "row",
						// bottom: vh(17.6),
					}}
				>
					<TouchableOpacity
						style={{
							// flex: 1,
							position: "relative",
							// alignSelf: "flex-start",
							// width: vw(2.5),
							opacity: 0.85,
							// backgroundColor: "red",
						}}
					>
						<FontAwesome
							name="caret-square-o-up"
							size={28}
							color={"lightslategray"}
						/>
					</TouchableOpacity>
					<Text
						style={{
							flex: 1,
							alignSelf: "center",
							textAlign: "center",
							fontFamily: "Marker Felt",
							fontSize: 19,
							fontFamily: "Papyrus",
							color: "darkslategray",
							marginHorizontal: vw(1.5),
							// backgroundColor: "gold",
						}}
					>
						200,000
					</Text>
					<TouchableOpacity
						style={{
							position: "relative",
							// alignSelf: "flex-end",
							// width: vw(7.5),
							opacity: 0.85,
							// backgroundColor: "blue",
						}}
					>
						<FontAwesome
							name="caret-square-o-down"
							size={28}
							color={"lightslategray"}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(ProfileStats);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// marginTop: vh(10),
	},
	background: {
		flex: 1,
		height: vh(90),
		width: vw(100),
		alignItems: "center",
		resizeMode: "center",
	},
	menuButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "brown",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	disabledButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "lavender",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	profilePic: {
		borderRadius: 82,
		height: vh(25),
		width: vw(42),
		opacity: 1.0,
		zIndex: 2,
		top: vh(0.03),
	},
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}

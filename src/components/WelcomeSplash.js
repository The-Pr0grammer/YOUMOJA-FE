import * as React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import {
	Input,
	ThemeProvider,
	Button,
	Icon,
	Text,
	Card,
} from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import Animation from "lottie-react-native";

class WelcomeSplash extends React.Component {
	componentDidMount() {
		this.playAnimation();
	}

	playAnimation = () => {
		this.myAnimation.play();
	};

	render() {
		const { isFocused } = this.props;
		{isFocused && setTimeout(
			() =>
				this.props.navigation.navigate("DrawerNav", { screen: "Home" }),
			4500
		)}
		return (
			<View
				style={styles.container}
			>
				<View>
					<Animation
						ref={(animation) => (this.myAnimation = animation)}
						style={{
							backgroundColor: "blue",
							width: vw(100),
							height: vh(100),
						}}
						source={require("../images/23913-black-lives-matter.json")}
					/>
				</View>
			</View>
		);
	}
}

export default function (props) {
	const isFocused = useIsFocused();

	return <WelcomeSplash {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});

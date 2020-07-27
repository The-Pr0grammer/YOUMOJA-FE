import * as React from "react";
import { View, StyleSheet, ImageBackground, TextInput } from "react-native";
import {
	Input,
	ThemeProvider,
	Button,
	Icon,
	Text,
} from "react-native-elements";
import { Dimensions } from "react-native";
import Image from "react-native-scalable-image";
import { connect } from "react-redux";

class Login extends React.Component {
	render() {
		// console.log(this.props.isLogged);
		return (
			<View style={styles.container}>
				<Image
					style={styles.background}
					width={Dimensions.get("window").width}
					source={require("../images/TulsaRiot.jpg")}
				></Image>
				<Image
					style={styles.background}
					width={Dimensions.get("window").width}
					source={require("../images/TulsaBookerTWashHighBand.jpg")}
				></Image>
				<Image
					style={{
						position: "absolute",
						bottom: "52%",
						zIndex: 1,
						alignSelf: "center",
						backgroundColor: "black",
					}}
					width={Dimensions.get("window").width / 2}
					source={require("../images/name.png")}
				></Image>
				<Image
					style={styles.background}
					width={Dimensions.get("window").width}
					source={require("../images/tulsa.jpeg")}
				></Image>
				<Image
					style={styles.background}
					width={Dimensions.get("window").width}
					source={require("../images/tulsaAftermath.jpeg")}
				></Image>
				<Image
					width={Dimensions.get("window").width / 4.5}
					style={styles.logo}
					source={require("../images/LOGO.png")}
				></Image>
				<View style={styles.inputView2}>
					<TextInput
						textAlign
						clearTextOnFocus={true}
						defaultValue="username"
						style={styles.input}
					/>
					<TextInput
						textAlign
						clearTextOnFocus={true}
						defaultValue="password"
						style={styles.input}
						secureTextEntry={true}
					/>
					<Button
						buttonStyle={{ backgroundColor: "black", borderRadius: 18 }}
						titleStyle={{ color: "red" }}
						style={styles.loginButton}
						onPress={() => {
							this.props.signIn();
							this.props.navigation.navigate("Home");
						}}
						title="Log In"
					></Button>
				</View>
				<View style={styles.loginBottom}></View>
				<Text h6 style={styles.signupMess}>
					Don't have an account? Sign up for free.
				</Text>
			</View>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 2,
		top: "2.5%",
		justifyContent: "center",
	},
	background: {
		flexDirection: "column",
	},
	name: {
		zIndex: 1,
		width: "40%",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "red",
	},
	inputView1: {
		position: "absolute",
		top: 435,
		left: "24%",
		justifyContent: "center",
		width: "50%",
		borderRadius: 10,
		// backgroundColor: "gold",
	},
	inputView2: {
		position: "absolute",
		top: 495,
		left: "24%",
		height: 200,
		justifyContent: "center",
		width: "50%",
		borderRadius: 10,
		// backgroundColor: "gold",
	},
	input: {
		top: 20,
		height: 40,
		fontSize: 26,
		borderRadius: 10,
		backgroundColor: "red",
		color: "black",
		margin: 5,
	},
	loginBottom: {
		position: "absolute",
		justifyContent: "center",
		color: "green",
		top: 750,
		left: 100,
		backgroundColor: "black",
		height: 5,
		width: 205,
	},
	logo: {
		zIndex: 1,
		position: "absolute",
		alignSelf: "center",
	},
	loginButton: {
		color: "black",
		marginTop: "15%",
		alignSelf: "center",
		position: "relative",
		justifyContent: "center",
		borderRadius: 20,
		height: "37%",
		width: "70%",
	},
	signupMess: {
		position: "absolute",
		justifyContent: "center",
		backgroundColor: "black",
		borderRadius: 40,
		color: "red",
		top: 760,
		left: 70,
	},
});

function mapStateToProps(state) {
	return { isLogged: state.isLogged };
}

function mapDispatchToProps(dispatch) {
	return {
		signIn: () => dispatch({ type: "SIGN IN" }),
	};
}

import React from "react";
import { View, SafeAreaView, MaskedViewComponent, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createStackNavigator } from "@react-navigation/stack";
import bizReducer from "./src/redux/reducers/bizReducer.js";
import Businesses from "./src/components/Businesses.js";
import Login from "./src/components/Login.js";
import BizPage from "./src/components/BizPage.js";
import Signup from "./src/components/Signup.js";
import EmailConfirmation from "./src/components/EmailConfirmation.js";
import WelcomeSplash from "./src/components/WelcomeSplash.js";
import ResetPassword from "./src/components/ResetPassword.js";
import Profile from "./src/components/Profile.js";
import PeerProfile from "./src/components/PeerProfile.js";
import Blackboard from "./src/components/Blackboard.js";
import Webview from "./src/components/Webview.js";
import EditProfile from "./src/components/EditProfile.js";
import * as firebase from "firebase";
import * as Linking from "expo-linking";

import "react-native-gesture-handler";

import { WebView } from "react-native-webview";

// const prefix = Linking.makeUrl("/");
const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(bizReducer);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const config = {
	apiKey: "AIzaSyAKHrDPaOn0wKzABaPixdVmtameX1Yh-ps",
	projectId: "youmoja-ae253",
	authDomain: "youmoja-ae253.firebaseapp.com",
	databaseURL: "https://youmoja-ae253.firebaseio.com/",
	storageBucket: "bucket.appspot.com",
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

function NotificationsScreen({ navigation }) {
	return (
		<SafeAreaView
			style={{
				alignSelf: "stretch",
				flex: 1,
				backgroundColor: "darkslategray",
			}}
		>
			<WebView
				containerStyle={{
					flex: 1,
					marginTop: vh(2),
					width: vw(100),
					height: vh(90),
				}}
				source={{ uri: "https://twitter.com/Youmoja_App" }}
				// startInLoadingState={true}
				// scalesPageToFit={true}
				// style={{}}
			/>
		</SafeAreaView>
	);
}

function AuthFlow({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "darkslategray",
					shadowColor: "transparent",
				},
				headerTintColor: "olivedrab",
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: "Marker Felt",
					fontSize: 24,
				},
			}}
		>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Signup"
				component={Signup}
				options={{
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Login")}
							title=" Login"
							titleStyle={{ color: "black" }}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="Email Confirmation"
				component={EmailConfirmation}
				options={{
					headerShown: true,
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Login")}
							title=" Login"
							titleStyle={{ color: "black" }}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="Welcome Splash"
				component={WelcomeSplash}
				options={{
					headerShown: false,
					headerLeft: null,
				}}
			/>
			<Stack.Screen
				name="Password Reset"
				component={ResetPassword}
				options={{
					headerShown: true,
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Login")}
							title=" Login"
							titleStyle={{ color: "black" }}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function DrawerNav({ navigation }) {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "darkslategray",
					shadowColor: "transparent",
				},
				headerTintColor: "olivedrab",
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: "Marker Felt",
					fontSize: 24,
				},
			}}
			// initialRouteName="Home" //THIS BREAKS APP? USE "Main"
			initialRouteName="Main"
			drawerType="slide"
			drawerContentOptions={{
				activeBackgroundColor: "black",
				activeTintColor: "olivedrab",
				inactiveTintColor: "black",
				labelStyle: {
					fontWeight: "normal",
					fontFamily: "Marker Felt",
					// fontSize: 16,
				},
				style: {
					backgroundColor: "darkslategray",
					flex: 1,
				},
			}}
		>
			<Drawer.Screen
				name="Home"
				component={Main}
				options={{
					headerShown: false,
					swipeEnabled: true,
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Login")}
							title=" Login"
							titleStyle={{ color: "black" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="Blackboard"
				component={Blackboard}
				options={{
					headerShown: false,
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Home")}
							title=" Blackboards"
							titleStyle={{ color: "black" }}
						/>
					),
					swipeEnabled: true,
				}}
			/>
			<Drawer.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					headerShown: false,
					headerLeft: () => (
						<Button
							icon={<Icon name="arrow-circle-left" size={25} color="black" />}
							type="clear"
							onPress={() => navigation.navigate("Login")}
							title=" Login"
							titleStyle={{ color: "black" }}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name="Logout"
				component={Login}
				options={{ swipeEnabled: false }}
			/>
		</Drawer.Navigator>
	);
}

function Main({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "darkslategray",
					shadowColor: "transparent",
				},
				headerTintColor: "olivedrab",
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: "Marker Felt",
					fontSize: 24,
				},
			}}
		>
			<Stack.Screen
				name="Home"
				component={Businesses}
				options={{
					headerShown: false,
					headerLeft: null,
				}}
			/>
			<Stack.Screen
				name="BizPage"
				component={BizPage}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="PeerProfile"
				component={PeerProfile}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Webview"
				component={Webview}
				options={{
					headerShown: true,
					headerLeft: () => (
						<Button
							icon={
								<Icon
									name="angle-left"
									size={40}
									color="black"
									style={{ height: vh(5.2), width: vw(12), left: vw(3.8) }}
								/>
							}
							type="clear"
							onPress={() => navigation.navigate("Profile")}
							// title="Profile"
							// titleStyle={{
							// 	color: "olivedrab",
							// 	fontSize: 16,
							// 	marginLeft: vw(5),
							// }}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="EditProfile"
				component={EditProfile}
				options={{
					headerShown: false,
					gestureEnabled: false,
					swipeEnabled: false,
					drawerLabel: "Profile",
					drawerLockMode: "locked-closed",
				}}
			/>
		</Stack.Navigator>
	);
}

function AppNav({ navigation }) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="DrawerNav"
				component={DrawerNav}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Auth"
				component={AuthFlow}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// console.log("PREFIX LINK IS🔆 🔆 🔆", prefix);

		return (
			<Provider store={store}>
				<NavigationContainer
					// linking={linking}
					fallback={<Text>Loading...</Text>}
				>
					<AppNav></AppNav>
				</NavigationContainer>
			</Provider>
		);
	}
}

export default App;

// const mapNavigationStateParamsToProps = (SomeComponent) => {
// 	return class extends Component {
// 		static navigationOptions = SomeComponent.navigationOptions;
// 		render() {
// 			const {
// 				navigation: {
// 					state: { params },
// 				},
// 			} = this.props;
// 			return <SomeComponent {...params} {...this.props} />;
// 		}
// 	};
// };

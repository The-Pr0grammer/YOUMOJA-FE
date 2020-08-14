import React from "react";
import { View, MaskedViewComponent } from "react-native";
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
import * as firebase from "firebase";

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
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button onPress={navigation.openDrawer} title="Open navigation drawer" />
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
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
							onPress={() => navigation.goBack()}
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
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

function DrawerNav({ navigation }) {
	return (
		<Drawer.Navigator
			initialRouteName="Login"
			drawerType="slide"
			drawerContentOptions={{
				activeBackgroundColor: "maroon",
				activeTintColor: "#e91e63",
				inactiveTintColor: "black",
				style: {
					backgroundColor: "darkslategray",
					flex: 1,
				},
			}}
		>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="Notifications" component={NotificationsScreen} />
			<Drawer.Screen
				name="Login"
				component={Login}
				options={{ swipeEnabled: false }}
			/>
			<Drawer.Screen
				name="Email Confirmation"
				component={EmailConfirmation}
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
					headerLeft: null,
				}}
			/>
			<Stack.Screen name="BizPage" component={BizPage} />
		</Stack.Navigator>
	);
}

function AppNav({ navigation }) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Auth"
				component={AuthFlow}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="DrawerNav" component={DrawerNav} />
		</Stack.Navigator>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Provider store={store}>
				<NavigationContainer>
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

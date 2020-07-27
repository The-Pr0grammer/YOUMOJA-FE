import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/components/Login.js";
import Businesses from "./src/components/Businesses.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import BizPage from "./src/components/BizPage.js";
import { createStackNavigator } from "@react-navigation/stack";
import bizReducer from "./src/redux/reducers/bizReducer.js";

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(bizReducer)


const Stack = createStackNavigator();


function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button onPress={navigation.openDrawer} title="Open navigation drawer" />
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
	);
}

function Home({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#f4511e",
				},
				headerTintColor: "blue",
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: "Marker Felt",
					fontSize: 24,
				},
			}}
		>
			<Stack.Screen name="Home" component={Businesses} />
			<Stack.Screen name="BizPage" component={BizPage} />
		</Stack.Navigator>
	);
}

const Drawer = createDrawerNavigator();

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<Drawer.Navigator initialRouteName="Login">
						<Drawer.Screen name="Home" component={Home} />
						<Drawer.Screen
							name="Notifications"
							component={NotificationsScreen}
						/>
						<Drawer.Screen name="Logout" component={Login} />
					</Drawer.Navigator>
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

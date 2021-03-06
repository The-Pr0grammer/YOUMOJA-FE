import React, { Component } from "react";
import {
	Animated,
	Dimensions,
	Keyboard,
	StyleSheet,
	TextInput,
	UIManager,
} from "react-native";
import { PropTypes } from "prop-types";
import { vh } from "react-native-expo-viewport-units";

const { State: TextInputState } = TextInput;

export default class KeyboardShift extends Component {
	state = {
		shift: new Animated.Value(0),
	};

	componentDidMount() {
		this.keyboardDidShowSub = Keyboard.addListener(
			"keyboardDidShow",
			this.handleKeyboardDidShow
		);
		this.keyboardDidHideSub = Keyboard.addListener(
			"keyboardDidHide",
			this.handleKeyboardDidHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	render() {
		const { children: renderProp } = this.props;
		const { shift } = this.state;
		return (
			<Animated.View
				style={[styles.container, { transform: [{ translateY: shift }] }]}
			>
				{renderProp()}
			</Animated.View>
		);
	}

	handleKeyboardDidShow = (event) => {
		const { height: windowHeight } = Dimensions.get("window");
		const keyboardHeight = event.endCoordinates.height;
		const currentlyFocusedField = TextInputState.currentlyFocusedField();
		UIManager.measure(
			currentlyFocusedField,
			(originX, originY, width, height, pageX, pageY) => {
				const fieldHeight = height;
				const fieldTop = pageY + vh(7.5);
				const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
				if (gap >= 0) {
					return;
				}
				Animated.timing(this.state.shift, {
					toValue: gap,
					duration: 300,
					useNativeDriver: true,
				}).start();
			}
		);
	};

	handleKeyboardDidHide = () => {
		Animated.timing(this.state.shift, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};
}

const styles = StyleSheet.create({
	container: {
		height: "0%",
		position: "absolute",
		width: "100%",
		zIndex: -1,
	},
});

KeyboardShift.propTypes = {
	children: PropTypes.func.isRequired,
};

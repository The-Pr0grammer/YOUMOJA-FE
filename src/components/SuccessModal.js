import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

export default class SuccessModal extends React.Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: "aqua",
					alignContent: "center",
					flex: 1,
				}}
			>
				<Modal
					style={{
						position: "relative",
						backgroundColor: "purple",
					}}
					animationType="fade"
					transparent={true}
					visible={true}
					onRequestClose={() => this.props.handleDismiss()}
				>
					<TouchableOpacity
						style={{ backgroundColor: "transparent", height: vh(100) }}
						onPress={() => this.props.handleDismiss()}
					>
						<Text
							style={{
								fontSize: 22,
								position: "absolute",
								alignSelf: "center",
								textAlign: "center",
								backgroundColor: "orange",
								width: vw(100),
								top: vh(54),
							}}
						>
							Your Comment Was Posted✅
						</Text>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

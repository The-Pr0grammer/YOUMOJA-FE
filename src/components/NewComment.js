import {
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	Modal,
} from "react-native";
import React from "react";
import { vh, vw } from "react-native-expo-viewport-units";
import { Icon } from "react-native-elements";
import axios from "axios";

export default class CommentInput extends React.Component {
	state = {
		text: "",
	};

	handleChangeText = (text) => {
		this.setState({ text });
	};

	handleSubmit = (props) => {
		if (!this.state.text) return;
		this.props.handleCancel();
		this.props.handleSuccess();
		this.props.handleClose();
		const ud = this.props.updateComments;

		axios
			.post(`http://localhost:3000/comments`, {
				user_id: 1,
				business_id: this.props.bizId,
				content: this.state.text,
			})
			.then(function (response) {
				ud(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		const { text } = this.state;
		// console.log(this.props.updateComments);
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={text}
					placeholder="Say something 🗣..."
					onChangeText={this.handleChangeText}
					// onSubmitEditing={this.handleSubmit}
					fontSize={20}
					backgroundColor={"silver"}
					textAlign={"center"}
					borderRadius={7}
					multiline={true}
					scrollEnabled={true}
					spellCheck={true}
					inlineImagePadding={5}
					keyboardAppearance={"dark"}
					number={280}
				/>
				<View
					style={{
						zIndex: 1,
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={{
							position: "relative",
							height: vh(6.5),
							width: vw(30),
							backgroundColor: "maroon",
							borderRadius: 30,
							marginVertical: vh(1),
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginLeft: vw(5),
						}}
						onPress={() => {
							this.props.handleCancel();
						}}
					>
						<Text
							style={{
								fontSize: 18,
								textAlignVertical: "center",
							}}
						>
							CANCEL
						</Text>
						<Icon
							name="cancel"
							type="materialcommunityicons"
							color="black"
							size={35}
							style={{ alignSelf: "flex-end" }}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							position: "relative",
							height: vh(6.5),
							width: vw(30),
							backgroundColor: "lime",
							borderRadius: 30,
							marginVertical: vh(1),
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginLeft: vw(24.5),
						}}
						onPress={() => {
							this.handleSubmit();
						}}
					>
						<Text
							style={{
								fontSize: 18,
								textAlignVertical: "center",
							}}
						>
							POST
						</Text>
						<Icon
							name="comment"
							type="materialcommunityicons"
							color="black"
							size={35}
							style={{ alignSelf: "flex-end" }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginTop: vh(1.5),
		marginBottom: vh(0.5),
		height: vh(20),
		position: "relative",
		zIndex: 1,
		backgroundColor: "orange",
	},
	input: { height: vh(10) },
});

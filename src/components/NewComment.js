import React from "react";
import {
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	Modal,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { vh, vw } from "react-native-expo-viewport-units";
import { postComment } from "../redux/actions/bizAction";
import { fetchComments } from "../redux/actions/bizAction";
import { fetchBizs } from "../redux/actions/bizAction";
import { connect } from "react-redux";

class NewComment extends React.Component {
	state = {
		text: "",
		errorMessage: "",
	};

	handleChangeText = (text) => {
		text.length > 0 &&
			this.state.errorMessage &&
			this.setState({
				errorMessage: "",
			});
		this.setState({
			text,
		});
	};

	handleSubmit = () => {
		if (/\S/.test(this.state.text)) {
			this.props.handleCancel();
			this.props.handleSuccess();
			this.props.handleClose();
			const data = {
				user_id: this.props.userInfo.id,
				business_id: this.props.bizId,
				content: this.state.text,
				score: 1,
			};
			this.props.postComment(data);
		} else if (!/\S/.test(this.state.text)) {
			this.setState({
				errorMessage: "Can't be blank",
			});
		}
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
				<Text
					style={{
						textAlign: "center",
						color: "red",
						height: vh(2),
						marginTop: vh(0.5),
					}}
				>
					{this.state.errorMessage}
				</Text>
				<View
					style={{
						zIndex: 1,
						flexDirection: "row",
					}}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						<Button
							title="Cancel"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={{
								position: "relative",
								// height: vh(6.5),
								width: vw(30),
								// marginVertical: vh(1),
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
								// marginLeft: vw(5),
							}}
							titleStyle={{
								color: "gray",
							}}
							onPress={() => this.props.handleCancel()}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
					<Button
						title="Post"
						buttonStyle={{
							backgroundColor: "transparent",
							borderRadius: 18,
						}}
						style={{
							position: "relative",
							// height: vh(6.5),
							width: vw(32),
							// marginVertical: vh(1),
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
						titleStyle={{
							color: "gray",
						}}
						onPress={() => this.handleSubmit()}
						// loading={buttonSpinner}
						// loadingProps={{ color: "green", size: "large" }}
					/>
				</View>
			</View>
		);
	}
}

export default connect(mapStateToProps, {
	postComment,
	fetchBizs,
})(NewComment);

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: vw(2.5),
		paddingVertical: vh(1.25),
		marginTop: vh(0.5),
		marginHorizontal: vw(1.5),
		height: vh(20),
		position: "relative",
		zIndex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		borderRadius: 5,
	},
	input: {
		height: vh(10),
	},
});

function mapStateToProps(state) {
	return {
		bizs: state,
		userInfo: state.userInfo,
	};
}

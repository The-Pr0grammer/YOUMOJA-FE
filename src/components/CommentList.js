import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Modal,
} from "react-native";
import React from "react";
import Comment from "./Comment.js";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Icon } from "react-native-elements";
import NewComment from "./NewComment.js";
import { connect } from "react-redux";
import { fetchComments } from "../redux/actions/bizAction";
import SuccessModal from "./SuccessModal.js";

class CommentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newCommentTogg: false,
			successTogg: false,
			expandTogg: false,
		};
	}
	componentDidMount() {
		this.props.fetchComments(this.props.bizId);
	}

	handleCancel = () => {
		this.setState({ newCommentTogg: false });
	};

	handleSuccess = () => {
		setTimeout(() => {
			this.setState({ successTogg: true });
		}, 750);
	};

	handleClose = () => {
		setTimeout(() => {
			this.setState({ successTogg: false });
		}, 2400);
	};

	handleDismiss = () => {
		this.setState({ successTogg: false });
	};

	updateComments = (newComment) => {
		this.setState({ comments: [newComment, ...this.state.comments] });
	};

	render() {
		// console.log(this.props.comments);
		return (
			<View style={styles.commList}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 20.5,
						fontFamily: "Marker Felt",
						// backgroundColor: "magenta",
						width: vw(50),
						alignSelf: "center",
					}}
				>
					COMMENTS({this.props.bizs.comments.length})
				</Text>
				{this.state.newCommentTogg == false && (
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							height: 37,
							width: 45,
						}}
						onPress={() => {
							this.setState({ newCommentTogg: true });
						}}
					>
						<Icon
							name="plus-circle"
							type="feather"
							color="aqua"
							size={37}
							style={styles.add}
						/>
					</TouchableOpacity>
				)}

				{this.state.successTogg == false && (
					<TouchableOpacity
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							height: vh(37),
							width: vw(12),
							marginTop: vh(0.5),
						}}
						onPress={() => {
							this.setState({ newCommentTogg: true });
						}}
					>
						<Icon
							name="arrows-expand"
							type="foundation"
							color="aqua"
							size={30}
							style={styles.add}
						/>
					</TouchableOpacity>
				)}
				<View>
					{this.state.newCommentTogg && (
						<NewComment
							bizId={this.props.bizId}
							handleCancel={this.handleCancel}
							handleSuccess={this.handleSuccess}
							handleClose={this.handleClose}
							updateComments={this.updateComments}
						/>
					)}
				</View>
				{this.state.successTogg && (
					<SuccessModal handleDismiss={this.handleDismiss} />
				)}
				<FlatList
					// contentContainerStyle={{ height: 1000 }}
					// style={{ height: 100, flexGrow: 1 }}
					style={{ marginTop: vh(1.2) }}
					data={this.props.bizs.comments}
					renderItem={({ item }) => <Comment comment={item} />}
					keyExtractor={(item) => item.id.toString()}
					extraData={this.props.bizs.comments}
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps, { fetchComments })(CommentList);

const styles = StyleSheet.create({
	commList: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		marginTop: vh(36.5),
		backgroundColor: "green",
		flexDirection: "column",
		position: "absolute",
		paddingBottom: vh(54.4), //THIS FIXED THE NOT SCROLLING TO BOTTOM ISSUE AFTER A DAY OF DEBUGGING
	},
	add: {
		// backgroundColor: "pink",
	},
});

function mapStateToProps(state) {
	return { bizs: state };
}

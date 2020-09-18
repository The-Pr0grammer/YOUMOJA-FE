import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { fetchUserInfo, fetchComments } from "../redux/actions/bizAction";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FitImage from "react-native-fit-image";

class Comment extends PureComponent {
	constructor(props) {
		super(props);
		this.relativeTime = "a";
		this.state = {
			score: false,
			vote: null,
			voteId: false,
			toggCooler: false,
		};
	}

	componentDidMount() {
		!this.state.score &&
			this.setState({
				score: this.props.comment.score,
			});

		let vote = this.props.comment.comment_votes.filter(
			(vote) => vote.user_id == this.props.userInfo.id
		)[0];

		// console.log("voteID iSSSSSSs🔥", vote["vote"]);
		vote && this.setState({ voteId: vote.id, vote: vote["vote"] });

		const timeCreated = moment(this.props.comment.created_at).utcOffset(
			"-04:00"
		);
		const timeFromNow = timeCreated.fromNow().toString();
		// console.log("COMMENT STAMP IS🕒", timeCreated);
		this.relativeTime = timeFromNow;
		// console.log("TIME FROM NOW IS🕒", this.relativeTime);
	}

	handleCommentVote = async (vote) => {
		if (!this.state.voteId) {
			// console.log("posting vote", vote);
			await axios
				.post(
					`http://127.0.0.1:3000/comment_votes`,
					{
						user_id: this.props.userInfo.id,
						comment_id: this.props.comment.id,
						vote: vote,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					// console.log("res issssss ", res.data);
					this.setState({
						voteId: res.data.id,
						vote: vote,
						score: this.state.score + vote,
					});
					this.handleScoreUpdate(vote);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		} else if (this.state.vote == vote) {
			await axios
				.delete(`http://127.0.0.1:3000/comment_votes/${this.state.voteId}`)
				.then(async (res) => {
					this.setState({
						voteId: null,
						score: this.state.score - this.state.vote,
						vote: null,
					});
					this.handleScoreUpdate(-1);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		} else if (vote == 1) {
			// console.log("updating vote UP", vote);
			await axios
				.patch(`http://127.0.0.1:3000/comment_votes/${this.state.voteId}`, {
					vote: 1,
				})
				.then((res) => {
					// console.log("RES is ", res);
					this.setState({
						voteId: res.data.id,
						vote: 1,
						score: this.state.score + 2,
					});
					this.handleScoreUpdate(vote);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		} else if (vote == -1) {
			// console.log("updating vote DOWN", vote);
			await axios
				.patch(`http://127.0.0.1:3000/comment_votes/${this.state.voteId}`, {
					vote: -1,
				})
				.then((res) => {
					// console.log("RESSSSSS is ", res);
					this.setState({
						voteId: res.data.id,
						vote: -1,
						score: this.state.score - 2,
					});
					this.handleScoreUpdate(vote);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		}
		setTimeout(() => {
			this.props.fetchComments(this.props.bizId, false);
		}, 250);
	};

	handleScoreUpdate = async (vote) => {
		// console.log("in the handle score", vote);
		if (vote == 1) {
			await axios({
				method: "PATCH",
				url: `http://127.0.0.1:3000/comments/${this.props.comment.id}`,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				data: {
					comment: {
						score: this.state.score,
					},
				},
			})
				.then((res) => {
					// console.log("comment score attribute updated💯 ", vote);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		} else if (vote == -1) {
			await axios({
				method: "PATCH",
				url: `http://127.0.0.1:3000/comments/${this.props.comment.id}`,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				data: {
					comment: {
						score: this.state.score,
					},
				},
			})
				.then((res) => {
					// console.log("comment score attribute updated💯 ", vote);
				})
				.catch((error) =>
					this.setState({
						errorMessage: "Please wait then try again.",
					})
				);
		}
	};

	applyCooler = () => {
		this.setState({ toggCooler: true });
		setTimeout(() => {
			this.setState({ toggCooler: false });
		}, 1000);
	};

	render() {
		const { isFocused } = this.props;
		{
			// isFocused && console.log("focused");

			let vote = this.props.comment.comment_votes.filter(
				(vote) => vote.user_id == this.props.userInfo.id
			)[0];

			// vote && console.log("voteID iSSSSSSs🔥", vote["vote"]);
			// vote && this.setState({ voteId: vote.id, vote: vote["vote"] });
		}
		// console.log("COMMENT VOTES ARE", this.props.comment.comment_votes);
		// console.log("COMMENT PROP IS 💬", this.props.comment);
		// console.log("vote is", this.state.vote);
		// console.log("USER ID IS", this.props.userInfo.id);
		// console.log("voteId", this.state.voteId);
		// console.log("toggCooler🧊 is ", this.state.toggCooler);
		// console.log("TIME FROM NOW IS🕒", );

		return (
			<View style={styles.commCon}>
				<View
					style={{
						flexDirection: "row",
						// backgroundColor: "blue",
						display: "flex",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("PeerProfile", {
								prevScreen: "BizPage",
								userShowInfo: this.props.comment.user,
							});
						}}
					>
						<Image
							resizeMode={"cover"}
							source={{
								uri: this.props.comment.user.img_url,
							}}
							style={styles.profilePic}
						></Image>
					</TouchableOpacity>
					<Text style={styles.username}>
						{this.props.comment.user.username}
					</Text>
					<Text style={styles.moment}> {this.relativeTime} </Text>
				</View>
				{/* <View style={styles.commentAndScoreView}> */}
				<Text style={styles.comment}>{this.props.comment.content}</Text>
				<View style={styles.CommScore}>
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							// width: vw(7.5),
							opacity: 0.85,
						}}
						disabled={this.state.toggCooler}
						onPress={() => {
							!this.state.toggCooler && this.handleCommentVote(1);
							this.applyCooler();
						}}
					>
						<FontAwesome
							name="caret-square-o-up"
							size={28}
							color={this.state.vote == 1 ? "gold" : "lightslategray"}
						/>
					</TouchableOpacity>
					<Text
						style={{
							alignSelf: "center",
							fontFamily: "Marker Felt",
							fontSize: 19,
							fontFamily: "Papyrus",
							color: "darkslategray",
							marginHorizontal: vw(1.5),
							// backgroundColor: "blue",
						}}
					>
						{this.state.score > 0 ? this.state.score : 0}
					</Text>
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							// width: vw(7.5),
							opacity: 0.855,
						}}
						disabled={this.state.toggCooler}
						onPress={() => {
							this.applyCooler();
							!this.state.toggCooler && this.handleCommentVote(-1);
						}}
					>
						<FontAwesome
							name="caret-square-o-down"
							size={28}
							color={this.state.vote == -1 ? "gold" : "lightslategray"}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default connect(mapStateToProps, {
	fetchUserInfo,
	fetchComments,
})(function (props) {
	const isFocused = useIsFocused();

	return <Comment {...props} isFocused={isFocused} />;
});

const styles = StyleSheet.create({
	commCon: {
		flex: 1,
		marginVertical: 0,
		marginHorizontal: 10,
		paddingVertical: vh(0.5),
		paddingRight: vw(1),
		marginBottom: vh(1),
		backgroundColor: "rgba(0,0,0,0.7)",
		borderWidth: 2,
		borderColor: "black",
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
	},
	comment: {
		flex: 1,
		alignSelf: "flex-start",
		fontFamily: "Marker Felt",
		fontSize: 20,
		marginTop: vh(1),
		marginLeft: vh(0.7),
		fontFamily: "Papyrus",
		// paddingLeft: vw(15),
		color: "olivedrab",

		// backgroundColor: "purple",
	},
	username: {
		flex: 1,
		position: "relative",
		alignSelf: "flex-end",
		marginVertical: 1,
		marginLeft: vw(1.5),
		fontFamily: "Georgia",
		fontSize: 16,
		color: "lightslategray",
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: vw(100),
		width: vw(11),
		alignSelf: "flex-end",
		marginLeft: vh(0.7),
		height: undefined,
		aspectRatio: 135 / 135,
	},
	CommScore: {
		flexDirection: "row",
		// backgroundColor: "red",
		position: "relative",
		justifyContent: "center",
		paddingLeft: vw(2),
		alignItems: "center",
		// backgroundColor: "orange",
		paddingRight: vw(1),
	},
	commentAndScoreView: {
		flexDirection: "column",
	},
	moment: { fontSize: 12, color: "olivedrab" },
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}

import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import TextTicker from "react-native-text-ticker";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { fetchUserInfo, fetchComments } from "../redux/actions/bizAction";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import FastImage from "react-native-fast-image";

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
					`http://192.168.1.211:3000/comment_votes`,
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
				.delete(`http://192.168.1.211:3000/comment_votes/${this.state.voteId}`)
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
				.patch(`http://192.168.1.211:3000/comment_votes/${this.state.voteId}`, {
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
				.patch(`http://192.168.1.211:3000/comment_votes/${this.state.voteId}`, {
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
				url: `http://192.168.1.211:3000/comments/${this.props.comment.id}`,
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
				url: `http://192.168.1.211:3000/comments/${this.props.comment.id}`,
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

		const numFormat = (n) => {
			if (n < 1e3) return n;
			if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
			if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
			if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
			if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
		};

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
						<FastImage
							resizeMode={"cover"}
							source={{
								uri: this.props.comment.user.image
									? `http://192.168.1.211:3000/${this.props.comment.user.image}`
									: this.props.comment.user.img_url,
							}}
							style={styles.profilePic}
						></FastImage>
					</TouchableOpacity>
					<Text style={styles.username}>
						{`${this.props.comment.user.username.charAt(0).toUpperCase()}` +
							`${this.props.comment.user.username.slice(1)}`}
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
							size={25}
							color={this.state.vote == 1 ? "gold" : "lightslategray"}
						/>
					</TouchableOpacity>
					<Text
						style={{
							alignSelf: "center",
							fontFamily: "Marker Felt",
							fontSize: 16,
							// fontFamily: "Papyrus",
							color: "darkslategray",
							fontWeight: "400",
							marginHorizontal: vw(1.5),
							// backgroundColor: "blue",
						}}
					>
						{this.state.score > 0 ? numFormat(this.state.score) : 0}
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
							size={25}
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
		fontSize: 16,
		marginTop: vh(1),
		marginLeft: vh(0.7),
		fontFamily: "Marker Felt",
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
		// aspectRatio: 135 / 128,
		aspectRatio: 85 / 80,
	},
	CommScore: {
		flexDirection: "row",
		position: "relative",
		justifyContent: "center",
		paddingLeft: vw(2),
		alignItems: "center",
		// backgroundColor: "orange",
		paddingRight: vw(1),
		marginVertical: vh(0.5),
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

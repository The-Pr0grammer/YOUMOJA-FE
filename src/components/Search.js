import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikes: [],
			page: 1,
			error: null,
			search: "",
			catTogg: false,
		};
	}
	render() {
		return (
			<View style={styles.searchDiv}>
				<SearchBar
					round
					searchIcon={{ size: 18 }}
					onChangeText={this.updateSearch}
					onSubmitEditing={(e) => this.props.fetchBizs(this.state.page)}
					placeholder={"     Search by keyword or location"}
					value={this.state.search}
					inputContainerStyle={{
						borderRadius: 100,
						height: vh(6.5),
						backgroundColor: "aqua",
						marginHorizontal: 0,
					}}
					containerStyle={{
						backgroundColor: "black",
						padding: 2,
					}}
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
	searchDiv: {
		position: "absolute",
		zIndex: 1,
		opacity: 1.0,
		width: "100%",
		height: vh(14),
		top: vh(6.6),
		// backgroundColor: "gold",
	},
});

function mapStateToProps(state) {
	return { category: state.category };
}

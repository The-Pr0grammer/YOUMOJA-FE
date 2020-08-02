import React from "react";
import { View, StyleSheet } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { handleSearch } from "../redux/actions/bizAction";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			search: "",
		};
	}

	componentDidMount() {
		this.props.handleSearch(this.state.search);
	}

	updateSearch = (e) => {
		return this.setState({ search: e });
	};

	submitSearch = () => {
		this.props.handleSearch(this.state.search);
		this.search.clear();
	};

	render() {
		// console.log(this.props.search);

		return (
			<View
				onFocus={() => {
					this.search.blur();
					this.props.handleSearchFocus();
				}}
				style={styles.searchDiv}
			>
				<SearchBar
					ref={(search) => (this.search = search)}
					round
					searchIcon={{ size: 18 }}
					onChangeText={this.updateSearch}
					onSubmitEditing={(e) => this.submitSearch()}
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

export default connect(mapStateToProps, { handleSearch })(Search);

const styles = StyleSheet.create({
	searchDiv: {
		position: "relative",
		zIndex: 1,
		opacity: 1.0,
		width: "100%",
	},
});

function mapStateToProps(state) {
	return { search: state.search };
}

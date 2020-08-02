import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
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

	componentDidMount = () => {
		this.search.focus();
	};

	updateSearch = (e) => {
		return this.setState({ search: e });
	};

	submitSearch = () => {
		this.props.handleSearch(this.state.search);
		this.props.handleSearchFocus();
		this.search.clear();
	};

	render() {
		// console.log(this.props.search);

		return (
			<Modal transparent={true}>
				<TouchableOpacity
					style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", height: vh(100) }}
					onPress={() => this.props.handleSearchFocus()}
				>
					<View style={styles.searchDiv}>
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
				</TouchableOpacity>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, { handleSearch })(Search);

const styles = StyleSheet.create({
	searchDiv: {
		position: "absolute",
		zIndex: 2,
		opacity: 1.0,
		marginTop: vh(17.35),
		width: "100%",
	},
});

function mapStateToProps(state) {
	return { search: state.search };
}

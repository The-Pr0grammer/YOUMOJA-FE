import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { handleSearch } from "../redux/actions/bizAction";
import Menu from "./Menu.js";
import Header from "./Header.js";

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
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.65)",
						// backgroundColor: "blue",
						flex: 1,
					}}
					onPress={() => this.props.handleSearchFocus()}
					activeOpacity={1}
				>
					<View style={styles.searchDiv}>
						{/* <Header type="Search" />
						<Menu /> */}
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.65)",
						// backgroundColor: "red",
						// height: vh(20),
						flex: 4.725,

						// zIndex: 12,
					}}
					onPress={() => this.props.handleSearchFocus()}
					activeOpacity={1}

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
							backgroundColor: "deepskyblue",
							marginHorizontal: 0,
						}}
						containerStyle={{
							backgroundColor: "black",
							padding: 2,
						}}
					/>
				</TouchableOpacity>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, { handleSearch })(Search);

const styles = StyleSheet.create({
	searchDiv: {
		position: "relative",
		zIndex: 2,
		opacity: 1.0,
		width: "100%",
		// bottom: vh(0.85),
	},
});

function mapStateToProps(state) {
	return { search: state.search };
}

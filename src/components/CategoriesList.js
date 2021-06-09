import React, { Component } from "react";
import {
	ScrollView,
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Dimensions,
	Modal,
	ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setIsFetching } from "../redux/actions/bizAction";

import Menu from "./Menu.js";
import Category from "./Category.js";

class CategoriesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadedState: false,
			categories: [
				{
					cat: "All Categories",
					id: 34,
					bg: require(`../images/categories/spinner.gif`),
				},
				{
					cat: "Other",
					id: 33,
					bg: require(`../images/categories/spinner.gif`),
				},
				{
					cat: "Writing",
					id: 32,
					bg: require(`../images/categories/Writing.jpeg`),
				},
				{
					cat: "Travel",
					id: 31,
					bg: require(`../images/categories/Travel.jpeg`),
				},
				{
					cat: "Transportation",
					id: 30,
					bg: require(`../images/categories/Transportation.jpg`),
				},
				{
					cat: "Technology",
					id: 29,
					bg: require(`../images/categories/Technology.png`),
				},

				{
					cat: "Safety & Security",
					id: 28,
					bg: require(`../images/categories/SafetySecurity.jpeg`),
				},
				{
					cat: "Repair",
					id: 27,
					bg: require(`../images/categories/Repair.jpg`),
				},
				{
					cat: "Real Estate",
					id: 26,
					bg: require(`../images/categories/RealEstate.jpeg`),
				},

				{
					cat: "Non Profit",
					id: 25,
					bg: require(`../images/categories/NonProfit.jpg`),
				},
				{
					cat: "Nightlife",
					id: 24,
					bg: require(`../images/categories/Nightlife.jpg`),
				},
				{
					cat: "Music",
					id: 23,
					bg: require(`../images/categories/Music.jpg`),
				},
				{
					cat: "Legal",
					id: 22,
					bg: require(`../images/categories/Legal.jpeg`),
				},
				{
					cat: "Interior Design",
					id: 21,
					bg: require(`../images/categories/InteriorDesign.jpeg`),
				},
				{
					cat: "Home & Outdoor",
					id: 20,
					bg: require(`../images/categories/HomeOutdoor.jpeg`),
				},
				{
					cat: "Health",
					id: 19,
					bg: require(`../images/categories/Health.jpg`),
				},
				{
					cat: "Hair & Beauty",
					id: 18,
					bg: require(`../images/categories/HairBeauty.jpeg`),
				},
				{
					cat: "Food",
					id: 17,
					bg: require(`../images/categories/Food.jpeg`),
				},
				{
					cat: "Fitness",
					id: 16,
					bg: require(`../images/categories/Fitness.jpg`),
				},
				{
					cat: "Financial",
					id: 15,
					bg: require(`../images/categories/Financial.jpeg`),
				},
				{
					cat: "Film & Photography",
					id: 14,
					bg: require(`../images/categories/FilmPhotography.jpg`),
				},
				{
					cat: "Fashion",
					id: 13,
					bg: require(`../images/categories/Fashion.jpeg`),
				},
				{
					cat: "Family",
					id: 12,
					bg: require(`../images/categories/Family.jpeg`),
				},
				{
					cat: "Event Planning",
					id: 11,
					bg: require(`../images/categories/EventPlanning.jpeg`),
				},
				{
					cat: "Education",
					id: 10,
					bg: require(`../images/categories/Education.jpeg`),
				},
				{
					cat: "Construction",
					id: 9,
					bg: require(`../images/categories/Construction.jpg`),
				},
				{
					cat: "Coaching",
					id: 8,
					bg: require(`../images/categories/Coaching.jpg`),
				},
				{
					cat: "Cleaning",
					id: 7,
					bg: require(`../images/categories/Cleaning.jpeg`),
				},
				{
					cat: "Children",
					id: 6,
					bg: require(`../images/categories/Children.jpg`),
				},
				{
					cat: "Broadcast Media",
					id: 5,
					bg: require(`../images/categories/BroadcastMedia.jpeg`),
				},
				{
					cat: "B2B",
					id: 4,
					bg: require(`../images/categories/B2B.jpg`),
				},
				{ cat: "Auto", id: 3, bg: require(`../images/categories/Auto.jpeg`) },
				{
					cat: "Art & Design",
					id: 2,
					bg: require(`../images/categories/ArtDesign.jpeg`),
				},
				{
					cat: "Animal",
					id: 1,
					bg: require(`../images/categories/Animal.jpeg`),
				},
				// {
				// 	cat: "emptyBox",
				// 	id: 0,
				// 	bg: require(`../images/categories/Logo.png`),
				// },

				// {
				// 	cat: "emptyBox",
				// 	id: 0,
				// 	bg: require(`../images/categories/Logo.png`),
				// },
			],
		};
	}

	handleLoaded = (cat) => {
		if (this.loaded.length == this.state.categories.length - 1) {
			this.setState({ loadedState: true });
		} else if (this.loaded.length >= this.state.categories.length) {
			this.loaded.length = 0;
		}
		this.loaded.push(cat);
		console.log(this.loaded.length);
	};

	render() {
		// const { isFocused } = this.props;
		// {
		// 	if (isFocused) {
		// 		console.log("FOCUSED");
		// 	}
		// }
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.catTogg}
				style={{ flex: 1 }}
				backdropOpacity={0.3}
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View // MENU
					style={{
						position: "absolute",
						// borderWidth: 1,
						top: vh(9.75),
					}}
				>
					<Menu
						navigation={this.props.navigation}
						handleCatsTogg={this.props.handleCatsTogg}
						active={true}
					/>
				</View>

				<View //BACKDROP
					style={{
						flex: 1,
						height: vh(100),
						width: vw(100),
						justifyContent: "center",
						alignItems: "center",
						top: vh(17.3),
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						paddingBottom: vh(17.3),
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: "transparent",
							height: vh(83.3),
						}}
						disabled={true}
						// onPress={() => this.props.handleCatsTogg()}
					>
						<FlatList
							contentContainerStyle={{
								flexGrow: 1,
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								paddingBottom: vh(2.5),
								// height: vh(70),
							}}
							data={this.state.categories.sort((a, b) => a.id - b.id)}
							renderItem={({ item }) => (
								<Category
									catObj={item}
									handleCatsTogg={this.props.handleCatsTogg}
									handleLoaded={this.handleLoaded}
									loaded={this.state.loadedState}
								/>
							)}
							keyExtractor={(item) => item.id.toString()}
							numColumns={3}
							showsVerticalScrollIndicator={false}
						/>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, {
	setIsFetching,
})(function (props) {
	const isFocused = useIsFocused();

	return <CategoriesList {...props} isFocused={isFocused} />;
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: vw(70),
		height: vh(100),
		backgroundColor: "red",
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "maroon",
		marginTop: vh(40),
	},
	bg: {
		flex: 1,
		resizeMode: "cover",
		opacity: 0.2,
		padding: 0,
		borderWidth: 0,
		width: vw(100),
		height: vh(100),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return { category: state.category };
}

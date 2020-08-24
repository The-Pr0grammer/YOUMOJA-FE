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
import { setIsFetching } from "../redux/actions/bizAction";
import { connect } from "react-redux";

import Menu from "./Menu.js";
import Category from "./Category.js";

class CategoriesList extends React.Component {
	constructor(props) {
		super(props);
		this.loaded = [];
		this.state = {
			loadedState: false,
			categories: [
				{
					cat: "Travel",
					id: 33,
					bg: require(`../images/categories/Travel.jpg`),
				},
				{
					cat: "Transportation",
					id: 32,
					bg: require(`../images/categories/Transportation.jpg`),
				},
				{
					cat: "Technology",
					id: 31,
					bg: require(`../images/categories/Technology.png`),
				},
				{
					cat: "Safety & Security",
					id: 30,
					bg: require(`../images/categories/SafetySecurity.jpg`),
				},
				{
					cat: "Sports & Fitness",
					id: 29,
					bg: require(`../images/categories/SportsFitness.jpg`),
				},
				{
					cat: "Spirituality",
					id: 28,
					bg: require(`../images/categories/Spirituality.jpg`),
				},
				{
					cat: "Repair",
					id: 27,
					bg: require(`../images/categories/Repair.jpg`),
				},
				{
					cat: "Recreation",
					id: 26,
					bg: require(`../images/categories/Recreation.png`),
				},
				{
					cat: "Real Estate",
					id: 25,
					bg: require(`../images/categories/RealEstate.jpeg`),
				},
				{
					cat: "Print & Media",
					id: 24,
					bg: require(`../images/categories/PrintMedia.jpg`),
				},
				{
					cat: "Non Profit",
					id: 23,
					bg: require(`../images/categories/NonProfit.jpg`),
				},
				{
					cat: "Nightlife",
					id: 22,
					bg: require(`../images/categories/Nightlife.jpg`),
				},
				{
					cat: "Music",
					id: 21,
					bg: require(`../images/categories/Music.jpg`),
				},
				{
					cat: "Legal",
					id: 20,
					bg: require(`../images/categories/Legal.jpeg`),
				},
				{
					cat: "Home & Outdoor",
					id: 19,
					bg: require(`../images/categories/HomeOutdoor.jpeg`),
				},
				{
					cat: "Health",
					id: 18,
					bg: require(`../images/categories/Health.jpg`),
				},
				{
					cat: "Food",
					id: 17,
					bg: require(`../images/categories/Food.jpeg`),
				},
				{
					cat: "Financial",
					id: 16,
					bg: require(`../images/categories/Financial.jpeg`),
				},
				{
					cat: "Film & Photography",
					id: 15,
					bg: require(`../images/categories/FilmPhotography.jpg`),
				},
				{
					cat: "Fashion",
					id: 14,
					bg: require(`../images/categories/Fashion.jpg`),
				},
				{
					cat: "Event Planning",
					id: 13,
					bg: require(`../images/categories/EventPlanning.jpeg`),
				},
				{
					cat: "Education",
					id: 12,
					bg: require(`../images/categories/Education.jpg`),
				},
				{
					cat: "Decor",
					id: 11,
					bg: require(`../images/categories/Decor.jpg`),
				},
				{
					cat: "Construction",
					id: 10,
					bg: require(`../images/categories/Construction.jpg`),
				},
				{
					cat: "Comfort",
					id: 9,
					bg: require(`../images/categories/Comfort.jpg`),
				},
				{
					cat: "Coaching",
					id: 8,
					bg: require(`../images/categories/Coaching.jpg`),
				},
				{
					cat: "Cleaning",
					id: 7,
					bg: require(`../images/categories/Cleaning.jpg`),
				},
				{
					cat: "Children",
					id: 6,
					bg: require(`../images/categories/Children.jpg`),
				},
				{
					cat: "Beauty & Hair",
					id: 5,
					bg: require(`../images/categories/BeautyHair.jpg`),
				},
				{ cat: "B2B", id: 4, bg: require(`../images/categories/B2B.jpg`) },
				{ cat: "Auto", id: 3, bg: require(`../images/categories/Auto.jpeg`) },
				{
					cat: "Art & Design",
					id: 2,
					bg: require(`../images/categories/ArtDesign.jpg`),
				},
				{
					cat: "Animal",
					id: 1,
					bg: require(`../images/categories/Animal.jpg`),
				},
				{
					cat: "All Categories",
					id: 34,
					bg: require(`../images/categories/Any.jpg`),
				},
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
		// console.log(this.loaded.length);
	};

	render() {
		// console.log("loading");
		const { isFocused } = this.props;
		{
			if (isFocused) {
				// this.loaded = [];
				// console.log("LOADED ARRAY IS", this.loaded);
			}
		}
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
						top: vh(9.5),
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
					<FlatList
						contentContainerStyle={{
							flexGrow: 1,
							flexDirection: "column-reverse",
							justifyContent: "center",
							alignItems: "center",
							// height: vh(70),
						}}
						data={this.state.categories}
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
});

function mapStateToProps(state) {
	return { category: state.category };
}

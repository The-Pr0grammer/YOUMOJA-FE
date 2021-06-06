import React, { useState, createRef } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Keyboard,
	ScrollView,
	TouchableOpacity,
	Modal,
	Image,
} from "react-native";
import { Button, CheckBox, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import {
	hasValidationError,
	usernameCheck,
	validateFields,
} from "./validation";
import Field from "./Field";
import * as firebase from "firebase";
import { sub } from "react-native-reanimated";

import ImageViewer from "react-native-image-zoom-viewer";

import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";

// i apologize in advance to anyone who is tasked with refactoring the code in this file, especially if that person is me.

const getInitialState = (fieldKeys) => {
	const state = {};
	fieldKeys.forEach((key) => {
		state[key] = "";
	});

	return state;
};

const Form = ({
	fields,
	buttonText,
	action,
	afterSubmit,
	handleCancel,
	purpose,
	buttonSpinner,
	handleChange,
	userInfo,
	handleOffset,
	scrollRef,
	propsError,
}) => {
	useFocusEffect(
		React.useCallback(() => {
			setValues("");
			// setValidationErrors("");
			setErrorMessage("");

			// purpose == "EditProfile" && setValues(userInfo);
		}, [])
	);

	const fieldKeys = Object.keys(fields);
	const [values, setValues] = useState(getInitialState(fieldKeys));
	const [errorMessage, setErrorMessage] = useState("");
	const [user, setUser] = useState({});
	const [newAllowEmails, setNewAllowEmails] = useState(userInfo.allow_emails);
	const [allowEmails, setAllowEmails] = useState(false);
	const [profileImg, setProfileImg] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [validationErrors, setValidationErrors] = useState(
		getInitialState(fieldKeys)
	);
	const [submitInc, setSubmitInc] = useState(0);
	const first = fieldKeys.find((key) => !validationErrors[key] == "");
	const refs = [];

	const onChangeValue = (key, value) => {
		handleChange && handleChange(key, value);
		const newState = { ...values, [key]: value };

		// console.log("newState is", newState);

		// purpose == "EditProfile" || purpose == "EditUserCreds"
		// 	? setValues(removeEmptyStrings(newState))
		// 	: setValues(newState);

		setValues(removeEmptyStrings(newState));

		if (validationErrors[key]) {
			const newErrors = { ...validationErrors, [key]: "" };
			setValidationErrors(newErrors);
		}
	};

	const getValues = () => {
		return fieldKeys.sort().map((key) => values[key]);
	};

	const removeEmptyStrings = (obj) => {
		let newObj = {};
		Object.keys(obj).forEach((prop) => {
			// if (obj[prop] !== "") {
			// 	newObj[prop] = obj[prop];
			// }

			if (!obj[prop].replace(/\s/g, "").length) {
				console.log("found an empty string");
			} else {
				newObj[prop] = obj[prop];
			}

			// !str.replace(/\s/g, "").length;
		});
		newObj.allow_emails == userInfo.allow_emails && delete newObj.allow_emails;
		return newObj;
	};

	const trimValues = (obj) => {
		let newObj = {};

		if (purpose == "Signup" && !Object.keys(obj).includes("allow_emails")) {
			obj.allow_emails = allowEmails;
		}

		Object.keys(obj).forEach((prop) => {
			// console.log("obj is", obj);
			newObj[prop] =
				prop == "allow_emails" || prop == "image"
					? obj[prop]
					: obj[prop].trim();
		});
		// console.log("newObj is", newObj);
		return newObj;
	};

	const checkForChanges = (obj) => {
		let present = false;

		Object.keys(obj)
			.sort()
			.forEach((prop) => {
				present = prop !== "currentPassword" ? true : false;
			});

		// console.log("changes present:", present);

		return present;
	};

	// const handleRefocus = () => {
	// 	// console.log("ves:", validationErrors);
	// 	// console.log("refssssss", refs);

	// 	if (!validationErrors == "") {
	// 		let find = fieldKeys.find((key) =>
	// 			Object.keys(validationErrors).includes(key)
	// 		);

	// 		let index = fieldKeys.findIndex((ele) => ele == find);

	// 		console.log("find is", find);
	// 		console.log("index is", index);

	// 		return refs[1].current && refs[1].current.focus();
	// 		return refs[index].current && refs[index].current.focus();
	// 		// return find.current && find.current.focus();
	// 	}
	// };

	const formatUrls = (obj) => {
		let newObj = {};
		let prefix = "https://www.";

		Object.keys(obj).forEach((prop) => {
			if (
				prop !== "twitter" &&
				prop !== "linkedin" &&
				prop !== "facebook" &&
				prop !== "instagram"
			) {
				newObj[prop] = obj[prop];
			} else {
				url = obj[prop];
				urlLower = obj[prop].toLowerCase();
				if (urlLower.includes(`${prop}.com`)) {
					url = prefix + url.substring(urlLower.indexOf(`${prop}.com`));
					newObj[prop] = url;
				} else {
					newObj[prop] = url;
				}
			}
		});

		return newObj;
	};

	const signIn = async () => {
		let firstPass = {};

		return await firebase
			.auth()
			.signInWithEmailAndPassword(userInfo.email, values["currentPassword"])
			.then(async () => {
				firebase.auth().onAuthStateChanged(async (firebaseUser) => {
					firstPass = firebaseUser;
					// return setUser(firebaseUser);
				});
			})
			.then(async () => {
				return { status: "200", user: firstPass };
			})
			.catch((error) => {
				console.log("Firebase error:", error);

				if (error.message.includes("invalid")) {
					return { currentPassword: "Invalid password" };
				} else if (error.message.includes("disabled")) {
					return {
						currentPassword: "Too many failed attempts. Try again later",
					};
				} else {
					return error;
				}
			});
	};

	const handlePicker = () => {
		ImagePicker.openPicker({
			// multiple: true,
			// waitAnimationEnd: false,
			// includeExif: true,
			// compressImageQuality: 0.8,
			// mediaType: "photo",
			maxFiles: 1,
			multiple: true,
			cropping: true,
			includeBase64: true,
			compressImageMaxHeight: 1080,
			compressImageMaxWidth: 1080,
		})
			.then((resp) => {
				const pick = resp.map((item, index) => {
					// console.log("IMAGE📸 DATA", item);

					const b = require("based-blob");

					const blob = b.toBlob(item.data);

					console.log("BLOB 🧴", blob._data.blobId); // true

					return (
						{
							url: `data:image/gif;base64,${item.data}`,
						},
						{
							url: `data:image/gif;base64,${item.data}`,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
							id: index,
							file_name: item.filename,
							uri: item.data,
						}
					);
				});

				// setImage(pick);
				setErrorMessage("");
				setProfileImg(pick);
				setValues({ ...values, image: pick });

				// console.log(
				// 	"IMAGES 👀🌃👀🌃👀🌃",
				// 	JSON.stringify(item.sourceURL.replace("file://", ""))
				// );
				// console.log("IMAGES PICKED::::", resp);
				// console.log("IMAGES 📸✨", images);
			})
			.catch((e) => {
				console.log(e);
				// setErrorMessage(e);
			});
	};

	const submit = async () => {
		Keyboard.dismiss();
		setErrorMessage("");
		setValidationErrors(getInitialState(fieldKeys));
		setValues(formatUrls(values));

		let newFields = { ...fields };

		if (purpose == "EditUserCreds") {
			for (var key in newFields) {
				if (key == "email" && !Object.keys(values).includes(key)) {
					delete newFields[key];
				}
			}
			// console.log(newFields);
		}

		if (purpose == "EditProfile") {
			for (var key in newFields) {
				if (!Object.keys(values).includes(key)) {
					delete newFields[key];
				}
			}
			// console.log(newFields);
		}

		let errors = [];
		purpose == "EditProfile" || purpose == "EditUserCreds"
			? (errors = validateFields(newFields, trimValues(values)))
			: (errors = validateFields(fields, trimValues(values)));

		// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯VALIDATIONS⬇
		if (hasValidationError(errors)) {
			// console.log(errors);
			// console.log(fields);
			// console.log(values);

			if (purpose == "Signup" && profileImg == "") {
				console.log("No profile pic 👀📸");

				setErrorMessage("Please choose a profile picture");
			}

			return setValidationErrors(errors); //VALIDATIONSSSSSSS
		} else if (!hasValidationError(errors)) {
			if (purpose == "Signup" && profileImg == "") {
				console.log("No profile pic 👀📸");

				return setErrorMessage("Please choose a profile picture");
			}
		}
		// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯VALIDATIONS⬆

		//SIGN IN FOR CREDENTIAL CHANGES
		signInRes = {};

		if (purpose == "EditUserCreds") {
			signInRes = await signIn();
			if (purpose == "EditUserCreds" && signInRes.status !== "200") {
				console.log("Sign in res is", signInRes);

				let newObj = {};

				for (let [k, v] of Object.entries(signInRes)) {
					newObj[k] = v;
				}

				// // console.log("newObj is ", newObj);

				{
					!Object.keys(newObj).includes("currentPassword") &&
						setErrorMessage("Something went wrong. Please try again later");
				}

				setValidationErrors(newObj);
				return;
			}
		}
		//SIGN IN FOR CREDENTIAL CHANGES

		try {
			switch (purpose) {
				case "EditProfile":
					result = await action(trimValues(values));
					break;
				case "EditUserCreds":
					console.log("FIRST TIME THRU♥️", signInRes);
					result = await action(trimValues(values), signInRes.user);
					break;
				case "Signup":
					console.log("CREATING 👨🏾‍🎨");
					result = await action(trimValues(values));
					break;
				default:
					result = await action(...getValues());
				// code block
			}

			// purpose == "EditProfile" || purpose == "EditUserCreds"
			// 	? (result = await action(trimValues(values)))
			// 	: (result = await action(...getValues()));

			console.log("result is", result);

			if (purpose == "EditProfile" && result.status !== "200") {
				// console.log("result is", result);

				var parsedData = JSON.parse(result);

				let newObj = {};

				for (let [k, v] of Object.entries(parsedData)) {
					k == "username"
						? (newObj[k] = `${k} ${v[0]}`)
						: (newObj[k] = `that ${k} is associated with another account`);
				}

				// console.log("newObj is ", newObj);

				{
					!Object.keys(newObj).includes("username") &&
						setErrorMessage("Something went wrong. Please try again.");
				}

				setValidationErrors(newObj);
				return;
			}

			if (purpose == "EditUserCreds" && result.status !== "200") {
				console.log("result izzzzz", result);

				var parsedData = JSON.parse(result);

				let newObj = {};

				for (let [k, v] of Object.entries(parsedData)) {
					newObj[k] = `that ${k} is associated with another account`;
				}

				console.log("newObj is ", newObj);

				{
					!Object.keys(newObj).includes("email") &&
						setErrorMessage("Something went wrong. Please try again.");
				}

				setValidationErrors(newObj);
				return;
			}

			if (purpose == "Signup" && result.status !== "200") {
				console.log("signup result status izzzzz", result.status);

				var parsedData = JSON.parse(result);

				let newObj = {};

				for (let [k, v] of Object.entries(parsedData)) {
					console.log(k);
					console.log(v);

					if (v.includes("taken")) {
						newObj[k] = `that ${k} is taken`;
					} else if (v.includes("associated")) {
						newObj[k] = `that ${k} is associated with another account`;
					} else newObj[k] = `Invalid entry. Try again`;
				}

				console.log("newObj is ", newObj);

				{
					!Object.keys(newObj).includes("email") &&
						!Object.keys(newObj).includes("username") &&
						setErrorMessage("Something went wrong. Please try again.");
				}

				setValidationErrors(newObj);
				return;
			}

			afterSubmit(result);
		} catch (e) {
			console.log("caught error IN THE FORM ‼️", e);
			setErrorMessage("Something went wrong. Please try again.");
		}
	};

	const consoleVals = (obj) => {
		newObj = {};
		Object.keys(values).map((prop) => {
			if (prop !== "image") {
				newObj[prop] = obj[prop];
			} else {
				newObj[prop] = obj[prop][0].uri.substring(0, 16);
			}
		});
		return newObj;
	};

	console.log("VALUES:", values);
	// console.log(removeEmptyStrings(userInfo));
	// console.log("eM:", errorMessage);
	// console.log("vEs:", validationErrors);
	// console.log("REFS↩:", refs);
	// console.log("field keys 🌾", fieldKeys);
	// console.log("console vals",consoleVals(values));

	return (
		<View style={styles.container}>
			{purpose == "Signup" && (
				<View
					style={{
						// flex: 1,
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
					}}
				>
					{isVisible && (
						// <ImageView
						// 	images={imgView}
						// 	onRequestClose={() => setIsVisible(false)}
						// 	visible={isVisible}
						// 	index={0}
						// 	doubleTapToZoomEnabled={true}
						// />
						<Modal
							visible={isVisible}
							transparent={true}
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<ImageViewer
								imageUrls={profileImg}
								onCancel={() => setIsVisible(false)}
								enableSwipeDown={true}
								index={0}
								renderIndicator={() => {}}
								menus={() => null}
								renderIndicator={() => <></>}
								style={{
									justifyContent: "center",
									alignItems: "center",
								}}
								renderImage={() => {
									return (
										<View
											style={{
												position: "absolute",
												justifyContent: "center",
												alignItems: "center",
												// backgroundColor: "lightslategray",
												height: "99%",
												width: "99%",
												// bottom: vh(0),
												paddingVertical: vh(2.5),
											}}
										>
											<Image
												resizeMode={"cover"}
												source={{
													uri: values["image"] && values["image"][0]["url"],
												}}
												style={{
													borderRadius: 360,
													width: "100%",
													// height: "50%",
													height: undefined,
													opacity: 1.0,
													zIndex: 2,
													aspectRatio: 135 / 135,
													alignSelf: "center",

													// bottom: vh(12),
												}}
												//PROFILE PICTURE 📸 📸 📸
											></Image>
										</View>
									);
								}}
							/>
						</Modal>
					)}

					{/* {errorMessage !== "" && (
						<Text style={styles.signupError}>{errorMessage}</Text>
					)} */}

					<Text style={styles.signupError}>{errorMessage}</Text>

					<View
						styles={{
							width: vw(100),
							backgroundColor: "blue",
							position: "absolute",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							// down: vh(120),
						}}
					>
						<TouchableOpacity
							styles={{
								// flexDirection: "column-reverse",
								height: vh(30),
								width: vw(30),
								backgroundColor: "blue",
								position: "absolute",
							}}
							onPress={() => {
								values["image"] ? setIsVisible(true) : handlePicker();
							}}
						>
							{values["image"] ? (
								<FastImage
									resizeMode={"cover"}
									source={{
										uri: values["image"] && values["image"][0]["url"],
									}}
									style={styles.profilePic}
									//PROFILE PICTURE 📸 📸 📸
								></FastImage>
							) : (
								<Icon
									name="camera"
									purpose="feather"
									color="olivedrab"
									// color="gray"
									size={115}
								/>
							)}
						</TouchableOpacity>

						<Button
							purpose={"clear"}
							title={values["image"] ? "Change Image" : "Choose Image"}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handlePicker();
							}}
						></Button>
					</View>

					<ScrollView
						enableAutoAutomaticScroll={false}
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={{
							alignItems: "center",

							// paddingVertical: vh(2.5),
						}}
						style={{
							flex: 1,
							zIndex: 1,
							// backgroundColor: "blue",
							// backgroundColor: "rgba(0, 0, 0, 0.8)",
							width: vw(95),
							height: vh(70),

							marginTop: vh(0.1),
						}}
					>
						{fieldKeys.map((key, index) => {
							// console.log(key);
							let keyRef = key;

							keyRef = createRef();

							refs.push(keyRef);
						})}

						{fieldKeys.map((key, index) => {
							// console.log(refs);
							// console.log(key);

							return (
								<Field
									key={key}
									fieldName={key}
									field={fields[key]}
									error={validationErrors[key] || false}
									onChangeText={onChangeValue}
									value={values[key]}
									keyRef={refs[index]}
									nextRef={refs[index + 1]}
									lastKey={fieldKeys.length - 1 == index}
									firstError={first == key}
									submitInc={submitInc}
									// handleChange={props.handleChange}
								/>
							);
						})}
						<View
							style={{
								top: vh(0),
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CheckBox
								title="Allow other users to email you?"
								checked={allowEmails}
								containerStyle={{
									width: vw(70),
									backgroundColor: "transparent",
									borderWidth: 0,
									marginBottom: vh(2),
								}}
								checkedColor="olivedrab"
								activeOpacity={1}
								onPress={() => {
									setAllowEmails(!allowEmails);
									onChangeValue("allow_emails", !allowEmails);
								}}
							/>

							<Button
								title={buttonText}
								buttonStyle={{
									backgroundColor: "transparent",
									borderRadius: 18,
								}}
								style={styles.createButton}
								titleStyle={{ color: "lightslategray" }}
								onPress={async () => {
									await submit();
									setSubmitInc(submitInc + 1);
								}}
								loading={buttonSpinner}
								loadingProps={{ color: "green", size: "large" }}
							/>
						</View>
					</ScrollView>
				</View>
			)}

			{purpose == "Login" && (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
					}}
				>
					{fieldKeys.map((key, index) => {
						let keyRef = key;

						keyRef = createRef();

						refs.push(keyRef);
					})}
					{fieldKeys.map((key, index) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
								keyRef={refs[index]}
								nextRef={refs[index + 1]}
								lastKey={fieldKeys.length - 1 == index}
								firstError={first == key}
								submitInc={submitInc}
							/>
						);
					})}

					{purpose == "Login" && (
						<Text style={styles.loginError}>{errorMessage}</Text>
					)}
					<View style={{ bottom: vh(1) }}>
						<Button
							title={buttonText}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={[
								purpose == "Login" ? styles.loginButton : styles.createButton,
							]}
							titleStyle={{ color: "lightslategray" }}
							onPress={async () => {
								await submit();
								setSubmitInc(submitInc + 1);
							}}
							loading={buttonSpinner}
							loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				</View>
			)}

			{purpose == "NewListing" && (
				<View
					style={{
						flex: 1,
						position: "relative",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
						// top: vh(36.75),
					}}
				>
					<Text style={styles.listingError}>{errorMessage || propsError}</Text>

					{fieldKeys.map((key, index) => {
						let keyRef = key;

						keyRef = createRef();

						refs.push(keyRef);
					})}
					{fieldKeys.map((key, index) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
								keyRef={refs[index]}
								nextRef={refs[index + 1]}
								lastKey={fieldKeys.length - 1 == index}
								firstError={first == key}
								submitInc={submitInc}
								purpose={purpose}
								scrollRef={scrollRef}
								// handleOffset={handleOffset}
							/>
						);
					})}

					<View
						style={{
							flex: 1,
							marginTop: vh(2.75),
							// backgroundColor: "green",
							// height: vh(10),
						}}
					>
						<Button
							title={"Post Business"}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							// style={[styles.createButton]}
							titleStyle={{ color: "lightslategray" }}
							onPress={async () => {
								await submit();
								setSubmitInc(submitInc + 1);
							}} // loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				</View>
			)}

			{purpose == "EditProfile" && (
				<View
					style={{
						flex: 1,
						position: "relative",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
						top: vh(5),
					}}
				>
					{fieldKeys.map((key, index) => {
						let keyRef = key;

						keyRef = createRef();

						refs.push(keyRef);
					})}
					{fieldKeys.map((key, index) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
								keyRef={refs[index]}
								nextRef={refs[index + 1]}
								lastKey={fieldKeys.length - 1 == index}
								firstError={first == key}
								submitInc={submitInc}
							/>
						);
					})}

					<View
						style={{
							flex: 1,
							// marginTop: vh(2.5),
						}}
					>
						<CheckBox
							title="Allow other users to email you?"
							checked={newAllowEmails}
							containerStyle={{
								width: vw(70),
								backgroundColor: "transparent",
								borderWidth: 0,
								marginBottom: vh(2),
							}}
							checkedColor="olivedrab"
							activeOpacity={1}
							onPress={() => {
								setNewAllowEmails(!newAllowEmails);
								onChangeValue("allow_emails", !newAllowEmails);
							}}
						/>
						{/* <CheckBox
							title="Display ♥️s on your profile?"
							checked={newAllowEmails}
							containerStyle={{
								width: vw(70),
								backgroundColor: "transparent",
								borderWidth: 0,
								marginBottom: vh(2),
							}}
							checkedColor="olivedrab"
							activeOpacity={1}
							onPress={() => {
								setNewAllowEmails(!newAllowEmails);
								onChangeValue("allow_emails", !newAllowEmails);
							}}
						/> */}

						<Button
							title={"Save Changes"}
							activeOpacity={Object.keys(values).length > 0 ? 0.1 : 1}
							buttonStyle={{
								backgroundColor: "transparent",
							}}
							titleStyle={
								Object.keys(values).length > 0
									? { color: "lightslategray" }
									: { color: "rgb(64,64,64)" }
							}
							// onPress={() => {
							// 	Object.keys(values).length > 0 && submit();
							// }}
							onPress={async () => {
								Object.keys(values).length > 0 && (await submit());
								setSubmitInc(submitInc + 1);
							}}
						/>

						<Button
							title={"Cancel"}
							buttonStyle={{
								backgroundColor: "transparent",
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={handleCancel}
						/>

						<Text
							style={{
								// width: vw(85),
								position: "relative",
								color: "red",
								textAlign: "center",
								zIndex: -1,
							}}
						>
							{errorMessage}
						</Text>
					</View>
				</View>
			)}

			{purpose == "EditUserCreds" && (
				<View
					style={{
						flex: 1,
						position: "relative",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
						top: vh(5),
					}}
				>
					{fieldKeys.map((key, index) => {
						let keyRef = key;

						keyRef = createRef();

						refs.push(keyRef);
					})}
					{fieldKeys.map((key, index) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
								keyRef={refs[index]}
								nextRef={refs[index + 1]}
								lastKey={fieldKeys.length - 1 == index}
								firstError={first == key}
								submitInc={submitInc}
							/>
						);
					})}

					<View
						style={{
							flex: 1,
							marginTop: vh(2.5),
						}}
					>
						<Button
							title={"Save Changes"}
							activeOpacity={checkForChanges(values) ? 0.1 : 1}
							buttonStyle={{
								backgroundColor: "transparent",
								width: vw(70),
							}}
							titleStyle={
								checkForChanges(values)
									? { color: "lightslategray" }
									: { color: "rgb(64,64,64)" }
							}
							// onPress={() => {
							// 	checkForChanges(values) && submit();
							// }}
							onPress={async () => {
								checkForChanges(values) && (await submit());
								setSubmitInc(submitInc + 1);
							}}
						/>

						<Button
							title={"Cancel"}
							buttonStyle={{
								backgroundColor: "transparent",
								marginTop: vh(1.5),
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={handleCancel}
						/>

						<Text
							style={{
								// width: vw(85),
								position: "relative",
								color: "red",
								textAlign: "center",
								zIndex: -1,
							}}
						>
							{errorMessage}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default connect(mapStateToProps, {})(Form);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
	createButton: {
		color: "black",
		position: "relative",
		borderRadius: 20,
		width: vw(38),
		height: vh(7),
	},
	loginButton: {
		position: "relative",
		borderRadius: 20,
		width: vw(35),
		height: vh(7),
		marginBottom: vh(2.2),
	},
	loginError: {
		// flex: 1,
		marginBottom: vh(1),
		height: vh(3),
		// backgroundColor: "red",
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
	signupError: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
	listingError: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
		// backgroundColor: "blue",
	},
	profilePic: {
		borderRadius: 119,
		width: "100%",
		opacity: 1.0,
		zIndex: 2,
		height: vh(15),
		aspectRatio: 100 / 100,
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}

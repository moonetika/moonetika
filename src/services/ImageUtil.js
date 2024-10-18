// PICK IMAGE FROM ANY BUTTON

const pickImage = async () => {
  // Ask for permission to access the media library
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Sorry, we need camera roll permissions to make this work!"
    );
    return;
  }

  // Open the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    const { uri } = result.assets[0]; // Get image URI
    const savedUri = await saveImageToFileSystem(uri); // Save the image locally
    console.log(savedUri, "savedUri");
    setAvatar(savedUri); // Set the new av6atar
  }
  // if (!result.canceled) {
  //   const { uri } = result.assets[0]; // Get image URI
  //   await uploadImageToFirebase(uri); // Upload image to Firebase
  // }
};

// Save images locally and save in firebase the filepath name
const saveImageToFileSystem = async (uri) => {
  try {
    console.log(uri);
    const fileName = uri.split("/").pop(); // Extract the file name
    const localUri = `${FileSystem.documentDirectory}${fileName}`; // Define local path
    await FileSystem.copyAsync({
      from: uri,
      to: localUri,
    });
    const userProfileMerged = { ...usuario, pictureFileName: fileName };
    SetUserProfileInfo(userProfileMerged, loggedInUser.uid);
    const finalUser = { ...loggedInUser, profile: userProfileMerged };
    setLoggedInUser(finalUser);
    return localUri; // Return the local path to the image
  } catch (error) {
    console.error("Error saving image:", error);
  }
};

const uploadImageToFirebase = async (uri) => {
  try {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.split("/").pop();
    const ref = storage.ref().child(`avatars/${fileName}`); // Reference to where the image will be stored

    // Upload the file to Firebase
    const snapshot = await ref.put(blob);

    // Get the download URL of the uploaded image
    const downloadURL = await snapshot.ref.getDownloadURL();
    console.log("New avatar URL:", downloadURL);
    setAvatar(downloadURL); // Set the new avatar URL

    Alert.alert("Success", "Your profile picture has been updated!");
  } catch (error) {
    console.error("Error uploading image: ", error);
    Alert.alert("Upload failed", "There was an issue uploading the image.");
  } finally {
    setUploading(false);
  }
};

const SetUserProfileInfo = async (data, uid) => {
  try {
    await setDoc(doc(db, "cliente", uid), data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};
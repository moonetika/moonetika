// // src/screens/ModifyDataScreen.tsx
// import React from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { useFormik } from "formik";
// import * as yup from "yup";
// // import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// // import { RootState } from '../store';

// const validationSchema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email().required("Email is required"),
// });

// const ModifyDataScreen = () => {
//   //   const user = useSelector((state: RootState) => state.user);
//   const user = { name: 'Jhoss', email: 'algo@email.com' };
//   // const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: { name: user.name, email: user.email },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // Replace with your data modification logic
//         const response = await axios.put("YOUR_USER_API_ENDPOINT", values);
//         if (response.data.success) {
//           // dispatch({ type: "UPDATE_USER", payload: values });
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Modify Data</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         onChangeText={formik.handleChange("name")}
//         onBlur={formik.handleBlur("name")}
//         value={formik.values.name}
//       />
//       {formik.errors.name && (
//         <Text style={styles.error}>{formik.errors.name}</Text>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={formik.handleChange("email")}
//         onBlur={formik.handleBlur("email")}
//         value={formik.values.email}
//       />
//       {formik.errors.email && (
//         <Text style={styles.error}>{formik.errors.email}</Text>
//       )}
//       {/* <Button title="Save" onPress={formik.handleSubmit} /> */}
//       <Button title="Save" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingLeft: 8,
//   },
//   error: { color: "red" },
// });

// export default ModifyDataScreen;


const ModifyDataScreen = () => {
  return (
        <View style={styles.container}>
          <Text style={styles.title}>Modify Data</Text>
        </View>
      );
};

export default ModifyDataScreen;
// // src/screens/TucanCardScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';

// const TucanCardScreen = () => {
//   const user = { nombre: 'Jhosmar', dni: '234404838', email: 'kevjhos.mkn@gmail.com'};

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>QR Code</Text>
//       <QRCode value={JSON.stringify(user)} size={200} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, marginBottom: 20 },
// });

// export default TucanCardScreen;


const TucanCardScreen = () => {
  return (
        <View style={styles.container}>
          <Text style={styles.title}>QR Code</Text>
        </View>
      );
};

export default TucanCardScreen;

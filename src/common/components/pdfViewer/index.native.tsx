import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";

export default function () {
  const { params } = useRoute();
  const { document } = params as any;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 25,
      }}
    >
      <Pdf
        trustAllCerts={false}
        source={{
          uri: document.objectUrl,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

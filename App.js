import React from "react";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
import {
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native";

export default function App() {
  const [url, setUrl] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [queue, setQueue] = React.useState([]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter URL to open webview"
        onChangeText={(text) => setUrl(text)}
        spellCheck={false}
        autoCapitalize="none"
        style={{ margin: 12 }}
        value={url}
      />
      <Button title="Open webview" onPress={() => setVisible(true)} />
      <StatusBar style="auto" />
      <Modal visible={visible}>
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            source={{ uri: url }}
            onMessage={(event) => {
              setQueue([...queue, event.nativeEvent.data]);
            }}
          />
          <ScrollView>
            {queue.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: "lightgray",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <Text>{index}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "#ddd",
              justifyContent: "space-around",
            }}
          >
            <Button title="Clear queue" onPress={() => setQueue([])} />
            <Button title="Close webview" onPress={() => setVisible(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

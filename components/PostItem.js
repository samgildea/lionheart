import React, { Component, useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
} from "native-base";
import { WebView } from "react-native-webview";
import HTML from "react-native-render-html";

import { getAssetUrl } from "takeshape-routing";
import { ScreenOrientation } from "expo";
import { Video, Audio } from "expo-av";
import VideoPlayer from "expo-video-player";

// import VideoPlayer from "expo-video-player";
import { Dimensions, StyleSheet } from "react-native";
import { human } from "react-native-typography";
import { TouchableOpacity } from "react-native-gesture-handler";

const PostItem = ({ item }) => {
  return (
    <Card style={{ backgroundColor: "#5067FF" }}>
      <CardItem header>
        <Text style={human.headline}>{item.title}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text> {item.description}</Text>
          {item.video &&
            (Platform.OS === "ios" ? (
              <Video
                source={{ uri: getAssetUrl(item.video.path) }}
                resizeMode="cover"
                useNativeControls
                playsInSilentModeIOS={true}
                style={{
                  width: Math.round(Dimensions.get("window").width) - 25,
                  height: Math.round(Dimensions.get("window").height / 3),
                }}
              />
            ) : (
              <VideoPlayer
                videoProps={{
                  shouldPlay: false,
                  source: {
                    uri: getAssetUrl(item.video.path),
                  },
                }}
                inFullscreen={true}
                width={Math.round(Dimensions.get("window").width) - 25}
                height={Math.round(Dimensions.get("window").height / 3)}
                showFullscreenButton={false}
              />
            ))}
          {item.audio && (
            <Video
              source={{ uri: getAssetUrl(item.audio.path) }}
              resizeMode="cover"
              useNativeControls
              playsInSilentModeIOS={true}
              style={{
                width: Math.round(Dimensions.get("window").width) - 25,
                height: Math.round(Dimensions.get("window").height / 12),
              }}
            />
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: "#73628A",
  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
  },
});

export default PostItem;

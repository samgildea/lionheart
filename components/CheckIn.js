import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Slider } from "react-native";
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
  Text,
  Card,
  CardItem
} from "native-base";

export default class CheckIn extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Text>How are you feeling? </Text>
          <Slider minimumTrackTintColor="#313D5A" />
        </Card>
      </View>
    );
  }
}

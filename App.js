import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Card,
} from "native-base";

import Slider from "react-native-slider";

import { Dimensions } from "react-native";
import { human } from "react-native-typography";

import responses from "./Responses.json";

import gql from "graphql-tag";
import { Image } from "react-native";
import { Query } from "react-apollo";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ScreenOne from "./pages/ScreenOne";
import ScreenTwo from "./pages/ScreenTwo";
import ScreenThree from "./pages/ScreenThree";
import ScreenFour from "./pages/ScreenFour";
import ScreenFive from "./pages/ScreenFive";
import ScreenSix from "./pages/ScreenSix";
import ScreenSeven from "./pages/ScreenSeven";

import client from "./Client";
import { getImageUrl } from "takeshape-routing";

import { ApolloProvider } from "react-apollo";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";

const messagesQuery = gql`
  query {
    getPositiveMessages {
      messages {
        message
      }
    }
  }
`;

const paintingsQuery = gql`
  query {
    getResponseImages {
      paintings {
        painting {
          _id
          caption
          credit
          description
          filename
          mimeType
          path
          sourceUrl
          title
          uploadStatus
        }
      }
    }
  }
`;

class App extends Component {
  state = {
    modalVisible: false,
    sliderValue: 5,
    alertMessageVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  closeCheckIn = () => {
    this.setState({ modalVisible: false, alertMessageVisible: true });
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#313D5A",
    },
    headerTintColor: "#fff",
    title: "EQ2",
  };

  goToFirstScreen = () => {
    this.props.navigation.navigate("ScreenOne");
  };

  goToSecondScreen = () => {
    this.props.navigation.navigate("ScreenTwo");
  };

  goToThirdScreen = () => {
    this.props.navigation.navigate("ScreenThree");
  };

  goToFourthScreen = () => {
    this.props.navigation.navigate("ScreenFour");
  };

  goToFifthScreen = () => {
    this.props.navigation.navigate("ScreenFive");
  };

  goToSixthScreen = () => {
    this.props.navigation.navigate("ScreenSix");
  };

  goToSeventhScreen = () => {
    this.props.navigation.navigate("ScreenSeven");
  };

  componentWillMount = () => {
    this.setModalVisible(true);
  };

  closeAlertMessage = () => {
    this.setState({ alertMessageVisible: false });
  };

  ResponseImages = [
    { image: require("./images/responseimages/1.jpg") },
    { image: require("./images/responseimages/2.jpg") },
    { image: require("./images/responseimages/3.jpg") },
    { image: require("./images/responseimages/4.jpg") },
    { image: require("./images/responseimages/5.jpg") },
    { image: require("./images/responseimages/6.jpg") },
    { image: require("./images/responseimages/7.jpg") },
    { image: require("./images/responseimages/8.jpg") },
    { image: require("./images/responseimages/9.jpg") },
    { image: require("./images/responseimages/11.jpg") },
    { image: require("./images/responseimages/12.jpg") },
    { image: require("./images/responseimages/13.jpg") },
    { image: require("./images/responseimages/14.jpg") },
    { image: require("./images/responseimages/15.jpg") },
    { image: require("./images/responseimages/16.jpg") },
    { image: require("./images/responseimages/17.jpg") },
    { image: require("./images/responseimages/18.jpg") },
    { image: require("./images/responseimages/19.jpg") },
    { image: require("./images/responseimages/20.jpg") },
    { image: require("./images/responseimages/21.jpg") },
    { image: require("./images/responseimages/22.jpg") },
    { image: require("./images/responseimages/23.jpg") },
    { image: require("./images/responseimages/24.jpg") },
    { image: require("./images/responseimages/25.jpg") },
    { image: require("./images/responseimages/26.jpg") },
    { image: require("./images/responseimages/27.jpg") },
    { image: require("./images/responseimages/28.jpg") },
    { image: require("./images/responseimages/29.jpg") },
    { image: require("./images/responseimages/30.jpg") },
    { image: require("./images/responseimages/31.jpg") },
    { image: require("./images/responseimages/32.jpg") },
    { image: require("./images/responseimages/33.jpg") },
    { image: require("./images/responseimages/34.jpg") },
    { image: require("./images/responseimages/34.jpg") },
    { image: require("./images/responseimages/35.jpg") },
    { image: require("./images/responseimages/36.jpg") },
    { image: require("./images/responseimages/37.jpg") },
    { image: require("./images/responseimages/38.jpg") },
    { image: require("./images/responseimages/39.jpg") },
    { image: require("./images/responseimages/40.jpg") },
  ];

  //items[Math.floor(Math.random()*items.length)];
  positiveMessage = () => {
    if (this.state.sliderValue < 4) {
      return responses.low[Math.floor(Math.random() * responses.low.length)];
    } else if (this.state.sliderValue < 7) {
      return responses.medium[
        Math.floor(Math.random() * responses.medium.length)
      ];
    } else if (this.state.sliderValue <= 10) {
      return responses.high[Math.floor(Math.random() * responses.high.length)];
    }
  };

  render() {
    return (
      <Container style={styles.mainContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.alertMessageVisible}
          onDismiss={() => this.positiveMessage()}
        >
          <View style={styles.responseCard}>
            <View>
              <Card style={styles.positiveMessage}>
                <CardItem>
                  <Body>
                    <Text>
                      <Text style={human.body}>{this.positiveMessage()}</Text>{" "}
                    </Text>
                    <View>
                      <Image
                        source={
                          this.ResponseImages[
                            Math.floor(
                              Math.random() * this.ResponseImages.length
                            )
                          ].image
                        }
                        style={{
                          width:
                            Math.round(Dimensions.get("window").width) - 25,
                          height: Math.round(
                            Dimensions.get("window").height / 2
                          ),
                        }}
                      />
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <Button
                onPress={() => {
                  this.closeAlertMessage();
                }}
              >
                <Text>Close</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onDismiss={() => this.positiveMessage()}
        >
          <View
            style={{
              flex: 1,
              height: 400,
              width: Dimensions.width,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View>
              <Card>
                <Text style={{ textAlign: "center" }}>
                  <Text style={human.largeTitle}>Daily Check-in</Text>
                </Text>
                <Text style={{ textAlign: "center" }}>
                  <Text style={human.title1}>How are you feeling? </Text>
                </Text>
                <Text style={{ textAlign: "center" }}>
                  <Text style={human.largeTitle}>{this.state.sliderValue}</Text>
                </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  value={Math.round(this.state.sliderValue)}
                  onValueChange={(sliderValue) =>
                    this.setState({ sliderValue })
                  }
                />

                <View style={styles.slider}>
                  <Text>Bad</Text>

                  <Text>Great</Text>
                </View>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Button
                    onPress={() => {
                      this.closeCheckIn();
                    }}
                  >
                    <Text>Submit</Text>
                  </Button>
                </TouchableHighlight>
              </Card>
            </View>
          </View>
        </Modal>
        <Content style={styles.content}>
          <Grid>
            <Col>
              <TouchableOpacity onPress={this.goToFirstScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/key.jpg")}
                    style={{
                      width: 50,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>Getting Started</Text>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={this.goToSecondScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/wave.jpg")}
                    style={{
                      width: 100,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>Before Your Shift</Text>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <TouchableOpacity onPress={this.goToThirdScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/finished.jpg")}
                    style={{
                      width: 50,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>When You’re Stressed</Text>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={this.goToFourthScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/hands.jpg")}
                    style={{
                      width: 50,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>Making it Right</Text>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <TouchableOpacity onPress={this.goToFifthScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/mountain.jpg")}
                    style={{
                      width: 100,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>Visualizations </Text>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={this.goToSixthScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/powersource.jpg")}
                    style={{
                      width: 50,
                      height: 75,
                    }}
                  />
                  <Text style={human.title3}>Meditations</Text>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <TouchableOpacity onPress={this.goToSeventhScreen}>
                <Card style={styles.card}>
                  <Image
                    source={require("./images/basketball.jpg")}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                  <Text style={human.title3}>Other Things to Up Your Game</Text>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const MainNavigator = createStackNavigator({
  App: {
    screen: App,
  },
  ScreenOne: { screen: ScreenOne },
  ScreenTwo: { screen: ScreenTwo },
  ScreenThree: { screen: ScreenThree },
  ScreenFour: { screen: ScreenFour },
  ScreenFive: { screen: ScreenFive },
  ScreenSix: { screen: ScreenSix },
  ScreenSeven: { screen: ScreenSeven },
});

const firstView = createAppContainer(MainNavigator);

export default firstView;
const styles = StyleSheet.create({
  positiveMessage: {},

  slider: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  responseCard: {
    flexGrow: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  mainContainer: {
    backgroundColor: "#E9EBF8",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#EAEAEA", // set elements horizontally, try column.
  },
  content: {
    flexGrow: 1,
    alignContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    height: Dimensions.get("window").height / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    textAlign: "center",
  },
});

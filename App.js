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
  Input,
  Item,
} from "native-base";

import Slider from "react-native-slider";

import { Dimensions, AsyncStorage } from "react-native";
import { human } from "react-native-typography";

import responses from "./Responses.json";
import client from "./Client";

import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { Image } from "react-native";
import { Query } from "react-apollo";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  createAppContainer,
  SafeAreaView,
  NavigationActions,
  StackActions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "./HomePage";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "HomePage" })],
});

const AuthenticationQuery = gql`
  query {
    getAuthenticationKeys {
      keys {
        key
      }
    }
  }
`;

class App extends Component {
  static navigationOptions = {
    header: null,
    headerMode: "screen",
  };

  state = {
    text: "",
    incorrectMessage: "",
  };

  componentDidMount() {
    this._retrieveData();
  }
  

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'userId',
        'test'
      );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.goToHomePage();
      } else {
        console.log("no data");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  submitAndSave = () => {
    this.goToHomePage;
    this._storeData();
  };

  goToHomePage = () => {
    this.props.navigation.push("HomePage");
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Please Enter Authentication Key</Text>
          <Item>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ input: text })}
              placeholder="Authentication Key"
            />
          </Item>
          <Text>{this.state.text}</Text>

          <Query query={AuthenticationQuery}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading</Text>;
              if (error) return `Error! ${error.message}`;
              return (
                <Button
                  onPress={
                    data.getAuthenticationKeys.keys.some(
                      (key) => key.key === this.state.input
                    )
                      ? this.goToHomePage
                      : () =>
                          this.setState({
                            incorrectMessage: "Incorrect Authentication Key",
                          })
                  }
                >
                  {console.log(data.getAuthenticationKeys.keys)}
                  <Text>Submit</Text>
                </Button>
              );
            }}
          </Query>
        </View>
      </ApolloProvider>
    );
  }
}

const MainNavigator = createStackNavigator(
  {
    App: {
      screen: App,
    },
    HomePage: { screen: HomePage },
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

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

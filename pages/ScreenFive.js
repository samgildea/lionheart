import React, { Component } from "react";
import { Text, View } from "react-native";
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
  CardItem
} from "native-base";
import { ApolloProvider, graphql } from "react-apollo";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import client from "../Client";
import PostList from "../components/PostList";

const fifthScreenContent = gql`
  {
    getFifthScreen {
      _id
      repeater {
        audio {
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
        description
        title
      }
    }
  }
`;

export default class ScreenFive extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#313D5A"
    },
    headerTintColor: "#fff"
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <View>
          <Query query={fifthScreenContent}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading</Text>;
              if (error) return `Error! ${error.message}`;
              return <PostList posts={data.getFifthScreen.repeater} />;
            }}
          </Query>
        </View>
      </ApolloProvider>
    );
  }
}

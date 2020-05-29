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

const firstScreenContent = gql`
  query {
    getFirstScreen {
      _id
      repeater {
        description
        title
        video {
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

export default class ScreenOne extends Component {
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
          <Query query={firstScreenContent}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading</Text>;
              if (error) return `Error! ${error.message}`;
              return <PostList posts={data.getFirstScreen.repeater} />;
            }}
          </Query>
        </View>
      </ApolloProvider>
    );
  }
}

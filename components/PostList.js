import React from "react";
import { View, Text } from "react-native";
import PostItem from "../components/PostItem";
import { Container, Content } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const PostList = ({ posts }) => {
  return (
    <ScrollView>
      {posts.map((item, idx) => (
        <PostItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
};
export default PostList;

import React, { useEffect, useState, Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

import {
  View,
  Modal,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
import Banner from "./Banner";
export default class AgendaDiaria extends Component {
  render() {
    return (
      <View>
        <Text>ok</Text>
      </View>
    );
  }

  componentDidMount() {
    console.log("did mount");
  }
  shouldComponentUpdate() {
    console.log("should");
  }
  componentDidUpdate() {
    console.log("ATUALIZADO");
  }
  componentWillUnmount() {
    console.log("WILL AMOUNT");
  }
  componentDidCatch() {
    console.log("did CATCH");
  }
  forceUpdate(callback?: () => void): void {
    console.log("force");
  }
  getSnapshotBeforeUpdate() {
    console.log("getSpap");
  }
}

import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
export default (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  estilo: any;
}) => {
  return <FontAwesome size={30} style={props.estilo} {...props} />;
};

import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { IconFamily, FontSize } from "../config/themeConfig";
import Typography from "./Typography";

interface IListItemProps {
  iconsType?: IconFamily;
  iconName?: string;
  onPress?: () => any;
}

export const ListItem: React.FunctionComponent<IListItemProps> = (props) => {
  const { children, iconName, iconsType, onPress } = props;
  const listItem = (
    <View style={styles.listItemContainer}>
      {iconName && (
        <Icon
          style={styles.iconContainer}
          size={FontSize["regular"]}
          type={iconsType}
          name={iconName}
        />
      )}
      <Typography type="regular">{children}</Typography>
    </View>
  );
  return onPress ? <Ripple onPress={onPress}>{listItem}</Ripple> : listItem;
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 4,
  },
});

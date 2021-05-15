import React, { useRef } from "react";
import { FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import NativeButton from "../../../common/components/NativeButton";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../common/config/themeConfig";
import useBottomSheet from "../../../common/hooks/useBottomSheet";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { logout } from "../../../helpers/auth";
import useLoginActions from "../../login/hooks/useLoginActions";
import ProfileEdit from "./ProfileEdit";
import config from "../../../config.json";
import { onShare, openURL } from "../../../common/helpers/platform";
import { DefaultShareMessage } from "../../../common/config/constants";

export default function ProfileMenu() {
  const profileSheet = useBottomSheet();
  const { logout } = useLoginActions();

  const list: IList[] = [
    {
      name: "Edit Profile",
      iconName: "create-outline",
      onPress: profileSheet.open,
    },
    {
      name: "Privacy Policy",
      iconName: "lock-closed-outline",
      onPress: () => openURL(config.privacyUrl),
    },
    {
      name: "Terms & Conditions",
      iconName: "library-outline",
      onPress: () => openURL(config.licenseUrl),
    },
    {
      name: "Share Application",
      iconName: "share-social-outline",
      noArrow: true,
      onPress: () => onShare(DefaultShareMessage),
    },
    {
      name: "Logout",
      iconName: "log-out-outline",
      color: AppTheme["color-danger"],
      noArrow: true,
      onPress: logout,
    },
  ];

  const keyExtractor = (item: any, index: number) => index.toString();

  const renderItem = ({ item }: FlatListRenderItem<any>) => (
    <NativeView
      rippleContainerBorderRadius={100}
      paddingLeft={DefaultMargin}
      marginHorizontal={-DoubleMargin}
      marginBottom={DoubleMargin}
      borderRadius={100}
    >
      <NativeView
        type="ripple"
        rippleContainerBorderRadius={500}
        onPress={item.onPress}
      >
        <ListItem
          containerStyle={{
            backgroundColor: DefaultBackgroundColor,
          }}
        >
          <Icon
            type={DefaultIconFamily}
            name={item.iconName}
            color={item.color}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Typography size={FontSize.h3x} color={item.color}>
                {item.name}
              </Typography>
            </ListItem.Title>
          </ListItem.Content>
          {!item.noArrow && (
            <Icon type={DefaultIconFamily} name="chevron-forward-outline" />
          )}
        </ListItem>
      </NativeView>
      <profileSheet.Sheet>
        <ProfileEdit close={profileSheet.close} />
      </profileSheet.Sheet>
    </NativeView>
  );

  return (
    <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
  );
}

interface IList {
  name: string;
  iconName: string;
  color?: string;
  noArrow?: boolean;
  onPress?: () => any;
}

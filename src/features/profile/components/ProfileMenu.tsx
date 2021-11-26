import React, { useRef } from "react";
import { Icon, ListItem } from "react-native-elements";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultBackgroundColor,
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import useBottomSheet from "../../../common/hooks/useBottomSheet";
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
      name: "Contact Us",
      onPress: () => openURL(config.contactUsUrl),
    },
    {
      name: "Refund And Cancellations",
      onPress: () => openURL(config.refundPolicyUrl),
    },
    {
      name: "Privacy Policy",
      onPress: () => openURL(config.privacyUrl),
    },
    {
      name: "Terms & Conditions",
      onPress: () => openURL(config.licenseUrl),
    },
    {
      name: "Share Application",
      noArrow: true,
      onPress: () => onShare(DefaultShareMessage),
    },
    {
      name: "Logout",
      noArrow: true,
      onPress: logout,
    },
  ];

  return (
    <>
      {list.map((item) => (
        <NativeView
          rippleContainerBorderRadius={100}
          borderRadius={DefaultBorderRadius}
          marginLeft={-10}
          key={item.name}
        >
          <NativeView
            type="ripple"
            rippleContainerBorderRadius={500}
            onPress={item.onPress}
            marginTop={DefaultMargin}
          >
            <ListItem
              containerStyle={{
                backgroundColor: DefaultBackgroundColor,
              }}
            >
              {item.iconName && (
                <Icon
                  type={DefaultIconFamily}
                  name={item.iconName}
                  color={item.color}
                />
              )}
              <ListItem.Content>
                <ListItem.Title>
                  <Typography type="h3">{item.name}</Typography>
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
      ))}
    </>
  );
}

interface IList {
  name: string;
  iconName?: string;
  color?: string;
  noArrow?: boolean;
  onPress?: () => any;
}

import React from "react";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { Image } from "react-native-elements";
import { styles } from "./OrganizationCard.style";
import { NativeSkeletonPlaceholder } from "../../../../common/components/nativeSkeleton";
import {
  DefaultMargin,
  DefaultSecondaryColor,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import { AppTheme } from "../../../../common/config/custom-theme";
import NativeButton from "../../../../common/components/NativeButton";
import Instagram from "../../../../common/assets/Instagram.svg";
import Youtube from "../../../../common/assets/Youtube.svg";
import { SvgProps } from "react-native-svg";
import { IconLabel } from "../../../../common/components/IconLabel";

interface IProps {}

export default function OrganizationCard(props: IProps) {
  return (
    <NativeView
      flexDirection="row"
      backgroundColor={SecondaryBackgroundColor}
      padding={DefaultMargin / 2}
      borderRadius={10}
    >
      <Image
        style={styles.profilePicture}
        source={{
          uri: "https://imagedelivery.net/ZVvTnL_5y8yMkXz-CrbmWg/bde96183-dad9-45c5-9a8d-c6b79c8aed00/classmateThumbnail",
        }}
        PlaceholderContent={
          <NativeSkeletonPlaceholder
            items={[
              {
                width: styles.profilePicture.width,
                height: styles.profilePicture.height,
                borderRadius: styles.profilePicture.borderRadius,
              },
            ]}
          ></NativeSkeletonPlaceholder>
        }
      />
      <NativeView marginLeft={DefaultMargin / 2} flex={1}>
        <Typography type="h3">Shreyas Surendranathan</Typography>
        <Typography
          type="xsx"
          marginTop={DefaultMargin / 4}
          marginBottom={DefaultMargin / 2}
          color={AppTheme["color-dark"]}
          numberOfLines={1}
        >
          Fashion influencer
        </Typography>
        <NativeView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconLabel Icon={Youtube} label="123k" />
          <IconLabel Icon={Instagram} label="44k" />
          <NativeButton
            title="Book slot"
            size="xs"
            buttonBackgroundColor={AppTheme["color-accent1"]}
            buttonTextColor={DefaultSecondaryColor}
            buttonFontFamily="regular"
            width={93}
          />
        </NativeView>
      </NativeView>
    </NativeView>
  );
}

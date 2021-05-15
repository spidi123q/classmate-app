import React from "react";
import { Icon } from "react-native-elements";
import NativeImage from "../../../../common/components/NativeImage";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { AppTheme } from "../../../../common/config/custom-theme";
import {
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../../../../common/config/themeConfig";
import { timeAgo } from "../../../../common/helpers/formatDate";
import IClaim from "../../../../models/Claim";
import { ClaimStatus } from "../../../../models/enum";
import CurrentServiceStatus from "./CurrentServiceStatus";

interface IProps {
  claim: IClaim;
}

export default function ServiceCard({ claim }: IProps) {
  return (
    <NativeView
      marginHorizontal={DefaultMargin}
      marginVertical={DoubleMargin}
      borderBottomWidth={1}
      borderBottomColor={AppTheme["color-grey"]}
    >
      <NativeView flexDirection="row" justifyContent="space-between">
        <NativeView flexDirection="row" alignItems="center">
          <Typography size={FontSize.h3x} family="semiBold">
            {claim.title}
          </Typography>
          <CurrentServiceStatus status={claim.status} />
        </NativeView>
        <NativeView>
          <NativeImage
            height={imageSize}
            width={imageSize * 2}
            resizeMode="center"
            firebaseRef={claim.product.brand.logo}
          />
        </NativeView>
      </NativeView>
      <NativeView
        flexDirection="row"
        justifyContent="space-between"
        marginVertical={DoubleMargin}
      >
        <NativeView>
          <Typography size={FontSize.h3} color={AppTheme["color-grey3"]}>
            {claim.product.name}
          </Typography>
        </NativeView>

        <NativeView flexDirection="row" alignItems="center">
          <Icon
            type={DefaultIconFamily}
            name="time-outline"
            size={FontSize.h2}
            color={AppTheme["color-grey3"]}
          />
          <Typography
            marginLeft={DefaultMargin}
            marginTop={2}
            size={FontSize.regular}
            color={AppTheme["color-grey3"]}
          >
            {timeAgo(claim.createdAt)}
          </Typography>
        </NativeView>
      </NativeView>
    </NativeView>
  );
}

const imageSize = 16;

import React from "react";
import { FlatList, ImageStyle, StyleProp } from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeSkeletonPlaceholder } from "../../../../common/components/nativeSkeleton";
import NativeView from "../../../../common/components/NativeView";
import Typography from "../../../../common/components/Typography";
import { DefaultPlaceholderList } from "../../../../common/config/constants";
import {
  DefaultMargin,
  DefaultHintFontColor,
} from "../../../../common/config/themeConfig";
import { FlatListRenderItem } from "../../../../common/models/RenderItem";
import IVideo from "../../../../models/Video";
import useUser from "../../../login/hooks/useUser";
import IDocumetResponse from "../../../../common/models/DocumetResponse";
import { DocumentItem } from "../../../documents/components/DocumentItem";

interface IProps {
  isLoading?: boolean;
}

export function DocumentList(props: IProps) {
  const navigation = useNavigation();
  const { classroom } = useUser();

  const renderItem = ({ item }: FlatListRenderItem<IDocumetResponse>) => (
    <DocumentItem document={item} />
  );
  return (
    <NativeView marginTop={DefaultMargin}>
      <Typography family="medium" type="h3">
        Documents
      </Typography>
      <NativeView>
        <FlatList
          data={classroom?.documents}
          renderItem={renderItem}
          keyExtractor={(item) => item.fileName}
          horizontal
          ListEmptyComponent={
            <NativeView marginVertical={DefaultMargin / 4}>
              <Typography color={DefaultHintFontColor} type="xs">
                Nothing uploaded yet
              </Typography>
            </NativeView>
          }
        />
      </NativeView>
    </NativeView>
  );
}

const imageStyle: ImageStyle = {
  height: 136,
  width: 175,
  borderRadius: 8,
};
const Placeholder = () => (
  <FlatList
    data={DefaultPlaceholderList}
    renderItem={({ item }) => (
      <NativeSkeletonPlaceholder
        items={[
          {
            width: imageStyle.width,
            height: imageStyle.height,
            borderRadius: imageStyle.borderRadius,
            marginTop: DefaultMargin / 2,
            marginRight: DefaultMargin,
          },
        ]}
      ></NativeSkeletonPlaceholder>
    )}
    keyExtractor={(item) => item.toString()}
    horizontal
  />
);

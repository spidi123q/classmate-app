import React from "react";
import { FlatList, ImageStyle, StyleProp } from "react-native";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultHintFontColor,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { IRootStackNavigationProps } from "../../../models/RoutePath";
import { DefaultPlaceholderList } from "../../../common/config/constants";
import IVideo from "../../../models/Video";
import useVideoActions from "../hooks/useVideoActions";
import { NativeSkeletonPlaceholder } from "../../../common/components/nativeSkeleton";
import { truncate } from "lodash";

interface IProps {
  title?: string;
  titleComponent?: JSX.Element;
  isLoading?: boolean;
  videos: IVideo[];
}

export default function VideoList(props: IProps) {
  const navigation = useNavigation<IRootStackNavigationProps>();
  const { title, titleComponent, isLoading, videos } = props;
  const { setLastPlayedVideo } = useVideoActions();

  const openVideo = (video: IVideo) => {
    setLastPlayedVideo(video);
    navigation.navigate("Video Details", {
      video,
    });
  };
  const renderItem = ({ item }: FlatListRenderItem<IVideo>) => (
    <NativeView
      type="ripple"
      marginTop={DefaultMargin / 2}
      marginRight={DefaultMargin}
      onPress={() => openVideo(item)}
    >
      <Image
        source={{
          uri: item.coverImageUrl,
        }}
        style={imageStyle}
      />
      <Typography
        family="medium"
        marginTop={DefaultMargin / 4}
        numberOfLines={1}
      >
        {truncate(item.name, {
          length: 20,
        })}
      </Typography>
      {item.duration && (
        <Typography type="xsx" color={DefaultHintFontColor}>
          {Math.floor(item.duration / 60)} mins
        </Typography>
      )}
    </NativeView>
  );
  return (
    <NativeView marginTop={DefaultMargin}>
      {titleComponent ?? (
        <Typography family="medium" type="h3x">
          {title}
        </Typography>
      )}
      <NativeView>
        {isLoading ? (
          <Placeholder />
        ) : (
          <FlatList
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            ListEmptyComponent={
              <NativeView marginVertical={DefaultMargin / 4}>
                <Typography color={DefaultHintFontColor} type="xs">
                  Nothing uploaded yet
                </Typography>
              </NativeView>
            }
          />
        )}
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

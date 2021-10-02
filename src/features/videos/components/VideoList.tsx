import React from "react";
import { FlatList, ImageStyle, StyleProp } from "react-native";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import { DefaultMargin } from "../../../common/config/themeConfig";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { HomePages } from "../../../models/RoutePath";
import { DefaultPlaceholderList } from "../../../common/config/constants";
import IVideo from "../../../models/Video";
import { IParam } from "./VideoDetails";
import useVideoActions from "../hooks/useVideoActions";
import { NativeSkeletonPlaceholder } from "../../../common/components/nativeSkeleton";

interface IProps {
  title?: string;
  titleComponent?: JSX.Element;
  isLoading?: boolean;
  videos: IVideo[];
}

export default function VideoList(props: IProps) {
  const navigation = useNavigation();
  const { title, titleComponent, isLoading, videos } = props;
  const { setLastPlayedVideo } = useVideoActions();

  const openVideo = (video: IVideo) => {
    setLastPlayedVideo(video);
    navigation.navigate(HomePages.VideoDetails, {
      video,
    } as IParam);
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
    </NativeView>
  );
  return (
    <NativeView marginTop={DefaultMargin}>
      {titleComponent ?? (
        <Typography family="medium" type="h3">
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

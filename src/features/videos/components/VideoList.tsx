import React from "react";
import { FlatList } from "react-native";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import {
  DefaultBorderRadius,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import { FlatListRenderItem } from "../../../common/models/RenderItem";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { HomePages } from "../../../models/RoutePath";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title:
      "https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title:
      "https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/sites/34/2014/11/math-teacher.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title:
      "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/b2928d2/2147483647/resize/800x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2F7f%2F38%2Fb37d0d6148e48fea8f76209eb3bb%2Fbigstock-pretty-teacher-smiling-at-came-69887626-1.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-d145571e29d72",
    title:
      "https://www.helpguide.org/wp-content/uploads/teacher-helping-young-student.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-d145e571e29d72",
    title:
      "https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/EDUCMS/p_acke3f50uyfhg-eyj-ia.jpg",
  },
];

interface IProps {
  title?: string;
  titleComponent?: JSX.Element;
}

export default function VideoList(props: IProps) {
  const navigation = useNavigation();
  const { title, titleComponent } = props;

  const openVideo = () => {
    navigation.navigate(HomePages.VideoDetails);
  };

  const renderItem = ({ item }: FlatListRenderItem<any>) => (
    <NativeView
      type="ripple"
      marginTop={DefaultMargin / 2}
      marginRight={DefaultMargin}
      onPress={openVideo}
    >
      <Image
        source={{
          uri: item.title,
        }}
        style={{
          height: 136,
          width: 175,
          borderRadius: 8,
        }}
      />
    </NativeView>
  );
  return (
    <NativeView marginTop={DefaultMargin}>
      {titleComponent ?? (
        <Typography family="medium" type="h3">
          Top Physics Lectures
        </Typography>
      )}
      <NativeView>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </NativeView>
    </NativeView>
  );
}

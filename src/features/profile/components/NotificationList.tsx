import React, { createRef, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import EmpyListPlaceholder from "../../../common/components/EmpyListPlaceholder";
import NativeAvatar from "../../../common/components/NativeAvatar";
import NativeHeader from "../../../common/components/NativeHeader";
import NativeImage from "../../../common/components/NativeImage";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import SubSection from "../../../common/components/SubSection";
import Typography from "../../../common/components/Typography";
import { DefaultonEndReachedThreshold } from "../../../common/config/constants";
import { AppTheme } from "../../../common/config/custom-theme";
import {
  DoubleMargin,
  SecondaryBackgroundColor,
  PageBorderRadius,
  IconFamily,
  DefaultAvatarSize,
  FontSize,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import { fadeIn, animate } from "../../../common/helpers/animation";
import {
  defaultDocKeyExtractor,
  defaultKeyExtractor,
  isLastElement,
} from "../../../common/helpers/misc";
import useAppInfo from "../../../common/hooks/useAppInfo";
import useNotificationAPI from "../../../common/hooks/useNotificationAPI";
import usePagination from "../../../common/hooks/usePagination";
import useRefList from "../../../common/hooks/useRefList";
import INotification, {
  INotificationQuery,
} from "../../../common/models/Notification";
import IPaginatedRequest from "../../../common/models/PaginatedRequest";
import { FlatListRenderItem } from "../../../common/models/RenderItem";

export default function NotificationList() {
  const {
    getNotifications,
    seenAndUpdateNotificationAlert,
    deleteNotifications,
  } = useNotificationAPI();
  const notificationPagination = usePagination<
    INotification,
    INotificationQuery
  >(getNotifications);

  const { refList } = useRefList(notificationPagination.collections.length);

  useEffect(() => {
    seenAndUpdateNotificationAlert();
  }, []);

  const clearAll = async () => {
    const animList = refList.map((ref) => animate("flipOutX", ref));
    await Promise.all(animList);
    deleteNotifications();
  };

  const renderItem = ({ item, index }: FlatListRenderItem<INotification>) => (
    <NativeView
      type="animatable"
      backgroundColor={SecondaryBackgroundColor}
      viewRef={refList[index]}
    >
      <ListItem bottomDivider>
        <NativeAvatar firebaseRef={item.image} />
        <ListItem.Content>
          <Typography size={FontSize.h3x}>{item.title}</Typography>
          <Typography
            size={FontSize.xs}
            marginTop={DefaultMargin / 2}
            color={AppTheme["color-grey2"]}
          >
            {item.body}
          </Typography>
        </ListItem.Content>
      </ListItem>
    </NativeView>
  );
  return (
    <NativeLayout>
      <NativeHeader
        noBorder
        title="Notifications"
        component={
          <NativeView
            marginTop={-DoubleMargin}
            marginHorizontal={DoubleMargin}
            alignItems="flex-end"
          >
            <Icon
              onPress={clearAll}
              type={IconFamily.Material}
              name="clear-all"
            />
          </NativeView>
        }
      />
      <NativeView
        marginTop={DoubleMargin}
        paddingTop={DoubleMargin}
        backgroundColor={SecondaryBackgroundColor}
        flex={1}
        borderTopLeftRadius={PageBorderRadius}
        borderTopRightRadius={PageBorderRadius}
      >
        <SubSection title="SEEN" marginHorizontal={DoubleMargin}>
          <FlatList
            keyExtractor={defaultDocKeyExtractor}
            data={notificationPagination.collections}
            renderItem={renderItem}
            onEndReachedThreshold={DefaultonEndReachedThreshold}
            onEndReached={notificationPagination.fetchCollections}
            ListFooterComponent={notificationPagination.RenderFooter}
            showsVerticalScrollIndicator={false}
            refreshing={notificationPagination.showRefreshControl}
            onRefresh={notificationPagination.onRefresh}
            ListEmptyComponent={
              <EmpyListPlaceholder
                items={notificationPagination.collections}
                isLoading={notificationPagination.isLoading}
              />
            }
          />
        </SubSection>
      </NativeView>
    </NativeLayout>
  );
}

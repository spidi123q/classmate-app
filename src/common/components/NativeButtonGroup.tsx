import React, { useRef, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { AppTheme } from "../config/custom-theme";
import {
  AppFonts,
  DefaultBorderRadius,
  DefaultMargin,
  InputHeight,
} from "../config/themeConfig";
import NativeButton from "./NativeButton";
import * as Animatable from "react-native-animatable";
import { bounce, fadeIn, pulse, slideUpProps } from "../helpers/animation";
import NativeLabel from "./NativeLabel";
import _, { isEmpty } from "lodash";
import KeyValuePair from "../models/KeyValuePair";
import SkeletonList from "./SkeletonList";
import { ShimmerPlaceHolder } from "../config/constants";

interface IProps {
  defaultValue?: string;
  label?: string;
  options: KeyValuePair[];
  onSelected: (selected: string) => any;
}

function NativeButtonGroup(props: IProps) {
  const { options, onSelected, label, defaultValue } = props;
  const defaultItem = _.find(options, {
    Value: defaultValue,
  });
  const defaultIndex = defaultItem ? options.indexOf(defaultItem) : 0;

  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);

  const renderItem = ({ item }: { item: KeyValuePair }) => {
    const isSelected: boolean = selectedIndex === options.indexOf(item);
    return (
      <Item
        isSelected={isSelected}
        title={item.Key.toString()}
        onPress={() => {
          const index = options.indexOf(item);
          setSelectedIndex(index);
          onSelected(options[index].Value.toString());
        }}
      />
    );
  };

  if (isEmpty(options)) {
    return (
      <SkeletonList flexDirection="row" Component={NativeButtonGroupSkeleton} />
    );
  }
  return (
    <NativeLabel label={label}>
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={options}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.Key.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </NativeLabel>
  );
}

interface ItemProps {
  isSelected: boolean;
  title: string;
  onPress(): any;
}

const Item = ({ isSelected, title, onPress }: ItemProps) => {
  const buttonRef = useRef<any>();
  return (
    <Animatable.View ref={(ref) => (buttonRef.current = ref)} {...slideUpProps}>
      <NativeButton
        mode={isSelected ? "oval" : undefined}
        type="clear"
        color={
          isSelected ? AppTheme["color-primary-500"] : AppTheme["color-dark"]
        }
        title={title}
        margin={DefaultMargin / 3}
        size="xs"
        fontFamily={AppFonts.GilroyMedium}
        buttonStyle={isSelected ? undefined : styles.unSelectedButton}
        onPress={() => {
          onPress();
          pulse(buttonRef);
        }}
      />
    </Animatable.View>
  );
};

export const NativeButtonGroupHeight: number = InputHeight / 1.7;

export const NativeButtonGroupSkeleton = () => <ShimmerPlaceHolder />;

const styles = StyleSheet.create({
  container: {
    //marginVertical: DefaultMargin,
  },
  unSelectedButton: {
    borderRadius: DefaultBorderRadius * 5,
    height: NativeButtonGroupHeight,
  },
});

export default React.memo(NativeButtonGroup);

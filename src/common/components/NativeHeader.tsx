import React, {
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import { bounceInProps, fadeIn, slideUpProps } from "../helpers/animation";
import { AppTheme } from "../config/custom-theme";
import Typography from "./Typography";
import { Button, Icon } from "react-native-elements";
import {
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
  ICON_SIZE,
} from "../config/themeConfig";
import { useNavigation } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";
import NativeView from "./NativeView";

interface IProps {
  title?: string;
  component?: JSX.Element;
  noBorder?: boolean;
}

export interface IHeader {
  toggle: () => void;
  setActions: (actions: IActions[]) => void;
}

const NativeHeader = forwardRef((props: IProps, ref: any) => {
  const navigation = useNavigation();
  const { title, component, noBorder } = props;
  const titleViewRef = useRef<any>();
  const actionViewRef = useRef<any>();
  const actionsRef = useRef<IActions[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);

  if (ref) {
    ref.current = {
      toggle: () => setShowActions(!showActions),
      setActions: (actions) => (actionsRef.current = actions),
    } as IHeader;
  }

  useEffect(() => {
    //showActions ? fadeIn(actionViewRef) : fadeIn(titleViewRef);
  }, [showActions]);
  return (
    <NativeView>
      <View
        style={[
          styles.container,
          {
            borderBottomWidth: noBorder ? 0 : 1,
          },
        ]}
      >
        <Icon
          containerStyle={styles.backButton}
          type={DefaultIconFamily}
          name="chevron-back-outline"
          size={ICON_SIZE}
          onPress={showActions ? ref.current.toggle : navigation.goBack}
        />
        <>
          {showActions ? (
            <Animatable.View
              ref={(ref) => (actionViewRef.current = ref)}
              style={styles.actionsContainer}
            >
              {actionsRef &&
                actionsRef.current.map((action) => (
                  <Icon
                    key={action.icon}
                    containerStyle={styles.iconContainer}
                    size={FontSize.h1}
                    name={action.icon}
                    type={DefaultIconFamily}
                    color="black"
                    onPress={() => {
                      console.log(action.onPress());
                    }}
                  />
                ))}
            </Animatable.View>
          ) : (
            <Animatable.View
              style={styles.titleContainer}
              ref={(ref) => (titleViewRef.current = ref)}
            >
              <Typography
                type="h2"
                family="semiBold"
                marginRight={DoubleMargin + ICON_SIZE + DefaultMargin}
                marginTop={DefaultMargin}
              >
                {title}
              </Typography>
            </Animatable.View>
          )}
        </>
      </View>
      {component}
    </NativeView>
  );
});

export interface IActions {
  icon: string;
  onPress: () => any;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: DoubleMargin,
    borderBottomColor: AppTheme["color-grey"],
    borderBottomWidth: 1,
  },
  cancelButtonText: {
    color: AppTheme["color-dark"],
  },
  cancelButton: {
    width: 75,
  },
  iconContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
  actionsContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  backButton: {
    marginLeft: DoubleMargin,
    paddingTop: DefaultMargin,
  },
});
export default NativeHeader;

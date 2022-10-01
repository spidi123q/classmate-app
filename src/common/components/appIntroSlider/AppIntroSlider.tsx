import { size } from "lodash";
import * as React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  I18nManager,
  FlatListProps,
  ViewStyle,
  NativeScrollEvent,
  GestureResponderEvent,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";
import { AppTheme } from "../../config/custom-theme";
import {
  DefaultFontColor,
  DefaultPrimaryColor,
  DoubleMargin,
  FontFamily,
} from "../../config/themeConfig";
import { WindowWidth } from "../../helpers/misc";
import NativeButton from "../NativeButton";
import NativeLayout from "../NativeLayout";
import NativeView from "../NativeView";
import Typography from "../Typography";
import mergeExtraData from "./merge-extradata";

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";

type Props<ItemT> = {
  data: ItemT[];
  renderItem: (
    info: ListRenderItemInfo<ItemT> & {
      dimensions: { width: number; height: number };
    }
  ) => React.ReactNode;
  renderSkipButton?: () => React.ReactNode;
  renderNextButton?: () => React.ReactNode;
  renderDoneButton?: () => React.ReactNode;
  renderPrevButton?: () => React.ReactNode;
  onSlideChange?: (a: number, b: number) => void;
  onSkip?: () => void;
  onDone?: () => void;
  renderPagination?: (activeIndex: number) => React.ReactNode;
  activeDotStyle: ViewStyle;
  dotStyle: ViewStyle;
  dotClickEnabled: boolean;
  skipLabel: string;
  doneLabel: string;
  nextLabel: string;
  prevLabel: string;
  showDoneButton: boolean;
  showNextButton: boolean;
  showPrevButton: boolean;
  showSkipButton: boolean;
  bottomButton: boolean;
  slideShow?: boolean;
  slideShowInterval?: number;
  footer?: JSX.Element;
} & FlatListProps<ItemT>;

type State = {
  width: number;
  height: number;
  activeIndex: number;
  isLastSlide: boolean;
};

export default class AppIntroSlider<ItemT = any> extends React.Component<
  Props<ItemT>,
  State
> {
  static defaultProps = {
    activeDotStyle: {
      backgroundColor: "rgba(255, 255, 255, .9)",
    },
    dotStyle: {
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
    dotClickEnabled: true,
    skipLabel: "Skip",
    doneLabel: "Done",
    nextLabel: "Next",
    prevLabel: "Back",
    showDoneButton: true,
    showNextButton: true,
    showPrevButton: false,
    showSkipButton: false,
    bottomButton: false,
  };
  state = {
    width: 0,
    height: 0,
    activeIndex: 0,
    isLastSlide: false,
  };
  flatList: FlatList<ItemT> | undefined;

  slideShowIntervalRef: NodeJS.Timeout | undefined;

  goToSlide = (pageNum: number, triggerOnSlideChange?: boolean) => {
    const isLastSlide = pageNum === this.props.data.length - 1;
    const prevNum = this.state.activeIndex;
    this.setState({ activeIndex: pageNum, isLastSlide: isLastSlide }, () => {
      this.flatList?.scrollToOffset({
        offset: this._rtlSafeIndex(pageNum) * this.state.width,
      });
      if (triggerOnSlideChange && this.props.onSlideChange) {
        this.props.onSlideChange(pageNum, prevNum);
      }
    });
  };

  // Get the list ref
  getListRef = () => this.flatList;

  // Index that works across Android's weird rtl bugs
  _rtlSafeIndex = (i: number) =>
    isAndroidRTL ? this.props.data.length - 1 - i : i;

  // Render a slide
  _renderItem = (flatListArgs: any) => {
    const { width, height } = this.state;
    const props = { ...flatListArgs, dimensions: { width, height } };
    // eslint-disable-next-line react-native/no-inline-styles
    return (
      <NativeView flex={1} width={width}>
        {this.props.renderItem(props)}
      </NativeView>
    );
  };

  _renderButton = (
    name: string,
    label: string,
    onPress?: () => void,
    render?: () => React.ReactNode
  ) => {
    const content = render
      ? render()
      : this._renderDefaultButton(name, label, onPress);
    return this._renderOuterButton(content, name, onPress);
  };

  _renderDefaultButton = (
    name: string,
    label: string,
    onPress?: () => void
  ) => {
    if (name == "Skip") {
      return (
        <Button
          type="clear"
          title={label}
          onPress={onPress}
          titleStyle={{
            fontFamily: FontFamily.regular,
            color: DefaultPrimaryColor,
          }}
        />
      );
    }
    return <NativeButton width={200} title={label} onPress={onPress} />;
  };

  _renderOuterButton = (
    content: React.ReactNode,
    name: string,
    onPress?: (e: GestureResponderEvent) => void
  ) => {
    return content;
  };

  _renderNextButton = () =>
    this.props.showNextButton &&
    this._renderButton(
      "Next",
      this.props.nextLabel,
      () => this.goToSlide(this.state.activeIndex + 1, true),
      this.props.renderNextButton
    );

  _renderPrevButton = () =>
    this.props.showPrevButton &&
    this._renderButton(
      "Prev",
      this.props.prevLabel,
      () => this.goToSlide(this.state.activeIndex - 1, true),
      this.props.renderPrevButton
    );

  _renderDoneButton = () =>
    this.props.showDoneButton &&
    this._renderButton(
      "Done",
      this.props.doneLabel,
      this.props.onDone,
      this.props.renderDoneButton
    );

  _renderSkipButton = () =>
    // scrollToEnd does not work in RTL so use goToSlide instead
    this.props.showSkipButton &&
    this._renderButton(
      "Skip",
      this.props.skipLabel,
      () =>
        this.props.onSkip
          ? this.props.onSkip()
          : this.goToSlide(this.props.data.length - 1),
      this.props.renderSkipButton
    );

  _renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View>
          <View style={styles.paginationDots}>
            {this.props.data.length > 1 &&
              this.props.data.map((_, i) =>
                this.props.dotClickEnabled ? (
                  <NativeView
                    key={i}
                    type="ripple"
                    onPress={() => this.goToSlide(i, true)}
                  >
                    <NativeView
                      key={i}
                      style={[
                        styles.dot,
                        this._rtlSafeIndex(i) === this.state.activeIndex
                          ? this.props.activeDotStyle
                          : this.props.dotStyle,
                        {
                          backgroundColor:
                            this._rtlSafeIndex(i) === this.state.activeIndex
                              ? DefaultFontColor
                              : AppTheme["color-grey3"],
                          opacity:
                            this._rtlSafeIndex(i) === this.state.activeIndex
                              ? 1
                              : 0.34,
                        },
                      ]}
                      onPress={() => this.goToSlide(i, true)}
                    />
                  </NativeView>
                ) : (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      this._rtlSafeIndex(i) === this.state.activeIndex
                        ? this.props.activeDotStyle
                        : this.props.dotStyle,
                    ]}
                  />
                )
              )}
          </View>
        </View>
      </View>
    );
  };

  _onMomentumScrollEnd = (e: { nativeEvent: NativeScrollEvent }) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = this._rtlSafeIndex(Math.round(offset / WindowWidth));
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    const lastIndex = this.state.activeIndex;
    this.setState({ activeIndex: newIndex });
    this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
  };

  _onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({ width, height });
      // Set new scroll position
      const func = () => {
        this.flatList?.scrollToOffset({
          offset: this._rtlSafeIndex(this.state.activeIndex) * width,
          animated: false,
        });
      };
      setTimeout(func, 0); // Must be called like this to avoid bugs :/
    }
  };

  startSlideShow = () => {
    if (this.props.slideShow) {
      this.slideShowIntervalRef = setInterval(() => {
        this.goToSlide(
          (this.state.activeIndex + 1) % size(this.props.data),
          true
        );
      }, this.props.slideShowInterval ?? 3000);
    }
  };

  componentDidMount() {
    this.startSlideShow();
  }

  componentWillUnmount() {
    this.slideShowIntervalRef && clearInterval(this.slideShowIntervalRef);
  }

  render() {
    // Separate props used by the component to props passed to FlatList
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      renderPagination,
      activeDotStyle,
      dotStyle,
      skipLabel,
      doneLabel,
      nextLabel,
      prevLabel,
      renderItem,
      data,
      extraData,
      footer,
      ...otherProps
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    // Merge component width and user-defined extraData
    const extra = mergeExtraData(extraData, this.state.width);
    const isLastSlide = this.state.activeIndex === this.props.data.length - 1;
    const isFirstSlide = this.state.activeIndex === 0;

    const secondaryButton =
      (!isFirstSlide && this._renderPrevButton()) ||
      (!isLastSlide && this._renderSkipButton());
    const primaryButton = isLastSlide
      ? this._renderDoneButton()
      : this._renderNextButton();

    return (
      <NativeLayout noSafeArea lockToPortrait>
        <StatusBar translucent backgroundColor={"transparent"} />
        <NativeView flex={3}>
          <FlatList
            ref={(ref) => (this.flatList = ref as FlatList<ItemT>)}
            data={this.props.data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={styles.flatList}
            renderItem={this._renderItem}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            extraData={extra}
            onLayout={this._onLayout}
            // make sure all slides are rendered so we can use dots to navigate to them
            initialNumToRender={data.length}
            {...otherProps}
          />
        </NativeView>
        <NativeView justifyContent="center" alignItems="center" flex={1}>
          <NativeView>
            {renderPagination
              ? renderPagination(this.state.activeIndex)
              : this._renderPagination()}
          </NativeView>
          {primaryButton}
          {footer}
        </NativeView>
      </NativeLayout>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    flexDirection: isAndroidRTL ? "row-reverse" : "row",
  },
  primaryButtonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  paginationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: isAndroidRTL ? "row-reverse" : "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: "absolute",
    left: 0,
  },
  rightButtonContainer: {
    position: "absolute",
    right: 0,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentBottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    padding: 12,
  },
});

export interface ISlide {
  key: string;
  title?: string;
  description?: string;
  image?: any;
  url?: string;
}

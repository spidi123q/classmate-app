import React, { useState, useRef, useEffect } from "react";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { FormikProps } from "formik";
import {
  View,
  StyleSheet,
  Animated,
  TextInputProps,
  LogBox,
} from "react-native";
import Ripple from "react-native-material-ripple";
import { VericalSpacer } from "./VericalSpacer";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import {
  AppFonts,
  DefaultFontLight,
  DefaultIconFamily,
  DefaultInputFontSize,
  DefaultMargin,
  FontSize,
  InputFontSize,
  InputHeight,
} from "../config/themeConfig";
import { AppTheme } from "../config/custom-theme";
import NativeInput from "./NativeInput";
import * as Animatable from "react-native-animatable";
import {
  bounceInProps,
  slideDownProps,
  slideUpProps,
} from "../helpers/animation";
import _ from "lodash";
import NativeTextInput, { INativeTextInput } from "./NativeTextInput";
import Typography from "./Typography";
import ImageInput from "./ImageInput";
import NativeLabel from "./NativeLabel";
import NativeButtonGroup from "./NativeButtonGroup";
import LocationInput from "./location/LocationInput";
import KeyValuePair from "../models/KeyValuePair";

type InputTypes =
  | "country"
  | "text"
  | "date"
  | "time"
  | "radio"
  | "dropdown"
  | "button-group"
  | "location"
  | "image";

interface IProps extends Partial<INativeTextInput>, Partial<CountryProps> {
  name: string;
  type: InputTypes;
  formikProps: FormikProps<any>;
  vericalSpacer?: boolean;
  min?: Date;
  max?: Date;
  iconName?: string;
  options?: KeyValuePair[];
  onLongPress?: (item: string) => any;
  locationFieldName?: string;
  addressFieldName?: string;
  progressList?: number[];
  disabled?: boolean;
}

const NativeField = (props: IProps) => {
  const {
    formikProps,
    type,
    name,
    iconName,
    vericalSpacer,
    options,
    onLongPress,
    locationFieldName,
    addressFieldName,
    progressList,
    ...rest
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<any>();

  const getFields = (type: InputTypes) => {
    switch (type) {
      case "text": {
        return (
          <NativeTextInput
            onChangeText={formikProps.handleChange(name)}
            onBlur={formikProps.handleBlur(name)}
            value={formikProps.values[name]}
            placeholderTextColor={AppTheme["color-dark"]}
            {...rest}
          />
        );
      }
      case "country": {
        return (
          <Ripple
            rippleContainerBorderRadius={4}
            onPress={() => {
              // setVisible(true)
            }}
          >
            <View style={StyleSheet.flatten([styles.country])}>
              <CountryPicker
                countryCode={
                  formikProps.values[name]?.cca2 ?? props.defaultValue
                }
                countryCodes={[]}
                withFilter
                withFlag
                withCountryNameButton
                withAlphaFilter
                withCallingCode
                withEmoji
                withCallingCodeButton
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={(country: Country) =>
                  formikProps.setFieldValue(name, country)
                }
                {...rest}
              />
            </View>
          </Ripple>
        );
      }
      case "date": {
        return (
          <>
            <NativeInput
              placeholder={props.placeholder}
              onPress={() => setVisible(true)}
              value={
                formikProps.values[name] &&
                new Date(formikProps.values[name]).toDateString()
              }
            />
            {visible && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={formikProps.values[name] ?? new Date()}
                mode={type}
                is24Hour={true}
                display="calendar"
                onChange={(event: any, selectedDate?: Date) => {
                  console.log("getFields -> selectedDate", selectedDate);
                  setVisible(false);
                  formikProps.setFieldValue(name, selectedDate);
                }}
              />
            )}
          </>
        );
      }

      case "dropdown": {
        const { placeholder, label } = props;
        return (
          <NativeLabel label={label}>
            <RNPickerSelect
              value={formikProps.values[name]}
              onValueChange={(value) => formikProps.setFieldValue(name, value)}
              items={
                options
                  ? options.map((option) => ({
                      value: option.Value,
                      label: option.Key.toString(),
                    }))
                  : []
              }
              style={{
                viewContainer: styles.inputContainer,
                placeholder: styles.inputPlaceholder,
                inputIOS: styles.input,
                inputAndroid: styles.input,
                inputAndroidContainer: styles.inputContainer,
                inputIOSContainer: styles.inputContainer,
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View style={styles.dropdownChevron}>
                  <Icon
                    size={FontSize.h2}
                    type={DefaultIconFamily}
                    name="chevron-down-outline"
                  />
                </View>
              )}
              placeholder={{
                label: placeholder ?? "Choose",
                value: null,
              }}
            />
          </NativeLabel>
        );
      }
      case "image":
        return (
          <ImageInput
            value={formikProps.values[name]}
            onChange={(uriList) => {
              console.log(`${name} -> selected`, uriList);
              formikProps.setFieldValue(name, uriList);
            }}
            onLongPressImage={onLongPress}
            progressList={progressList}
          />
        );
      case "button-group":
        return (
          <NativeButtonGroup
            defaultValue={formikProps.values[name]}
            onSelected={(selected) => {
              console.log(`${name} -> selected`, selected);
              formikProps.setFieldValue(name, selected);
            }}
            options={options ?? []}
            {...rest}
          />
        );
      case "location":
        return (
          <LocationInput
            defaultLocation={formikProps.values[name]}
            onSelected={(location) => {
              formikProps.setFieldValue(
                locationFieldName ?? "location",
                location.location
              );
              formikProps.setFieldValue(
                addressFieldName ?? "address",
                location.address
              );
            }}
            {...rest}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <FormErrorCheck name={name} formikProps={formikProps}>
        {getFields(type)}
      </FormErrorCheck>
      {vericalSpacer && <VericalSpacer />}
    </>
  );
};

interface IFormErrorCheckProps {
  formikProps: FormikProps<any>;
  name: string;
}

const FormErrorCheck: React.FunctionComponent<IFormErrorCheckProps> = ({
  formikProps,
  children,
  name,
}) => (
  <View>
    {children}
    {formikProps.touched[name] && !_.isEmpty(formikProps.errors[name]) && (
      <Animatable.View {...bounceInProps()} style={styles.errorContainer}>
        <Icon
          name="close-circle-outline"
          type={DefaultIconFamily}
          color={AppTheme["color-danger-500"]}
          size={18}
        />
        <Typography
          color={AppTheme["color-danger-500"]}
          marginLeft={4}
          family="light"
        >
          {formikProps.errors[name] as string}
        </Typography>
      </Animatable.View>
    )}
  </View>
);

const styles = StyleSheet.create({
  input: {
    fontSize: DefaultInputFontSize,
    color: "black",
    fontFamily: DefaultFontLight,
  },
  inputContainer: {
    backgroundColor: AppTheme["color-dark-light"],
    borderRadius: 4,
    fontFamily: DefaultFontLight,
    height: InputHeight,
    paddingLeft: InputFontSize / 2,
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  radioContainer: {
    marginLeft: 10,
  },
  errorText: {
    color: AppTheme["color-danger-500"],
    marginLeft: 4,
    fontFamily: DefaultFontLight,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  country: {
    justifyContent: "center",
    alignItems: "center",
    height: InputHeight,
  },
  inputPlaceholder: {
    fontSize: DefaultInputFontSize,
    fontFamily: DefaultFontLight,
    color: AppTheme["color-dark"],
  },
  dropdownChevron: {
    height: InputHeight,
    justifyContent: "center",
    marginRight: DefaultMargin,
  },
});
type CountryProps = typeof CountryPicker;

export default NativeField;

LogBox.ignoreLogs([
  "Cannot update a component from inside the function body of a different component.",
]);

import React, { useRef, useState } from "react";
import LocationResult from "../../../models/LocationResult";
import LocationSearchSheet, {
  ILocationSearchSheetProps,
} from "./LocationSearchSheet";
import NativeInput from "../NativeInput";
import { INativeTextInput } from "../NativeTextInput";

interface IProps extends ILocationSearchSheetProps, INativeTextInput {
  defaultLocation?: LocationResult;
}

export default function LocationInput(props: IProps) {
  const { defaultLocation, onSelected, ...rest } = props;
  const refRBSheet = useRef<any>();
  const [value, setValue] = useState<string>(defaultLocation?.address ?? "");
  return (
    <>
      <NativeInput
        value={value}
        onPress={() => refRBSheet.current.open()}
        selection={{ start: 0, end: 0 }}
        {...rest}
      />
      <LocationSearchSheet
        onSelected={(location) => {
          setValue(location.address);
          onSelected(location);
        }}
        onInit={(refSheet) => {
          refRBSheet.current = refSheet;
        }}
      />
    </>
  );
}

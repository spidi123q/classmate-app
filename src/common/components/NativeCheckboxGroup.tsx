import { find } from "lodash";
import React, { useState } from "react";
import { DefaultMargin } from "../config/themeConfig";
import KeyValuePair from "../models/KeyValuePair";
import NativeCheckBox, { INativeCheckBoxProps } from "./NativeCheckBox";
import NativeView from "./NativeView";

export interface INativeCheckBoxGroupGroupProps {
  options: INativeCheckBoxGroupOptions[];
  onChange: (value: string) => void;
  defaultValue?: boolean;
  value?: string;
}

export default function NativeCheckBoxGroup(
  props: INativeCheckBoxGroupGroupProps
) {
  const { options } = props;
  const [value, setValue] = useState<string | undefined>(props.value);

  const onChange = (option: INativeCheckBoxGroupOptions, value: boolean) => {
    if (value) {
      const selected = find(options, {
        Key: option.Key,
      });
      setValue(selected?.Value);
      props.onChange(selected?.Value);
    }
  };

  return (
    <NativeView>
      {options.map((option) => (
        <NativeView key={option.Key} marginBottom={DefaultMargin}>
          <NativeCheckBox
            label={option.Key.toString()}
            onChange={(value: boolean) => onChange(option, value)}
            checked={option.Value === value}
          />
        </NativeView>
      ))}
    </NativeView>
  );
}

export interface INativeCheckBoxGroupOptions extends KeyValuePair {
  hint?: string;
}

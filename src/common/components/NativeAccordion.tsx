import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import {
  DeafultBorderColor,
  DefaultBorderRadius,
  DefaultHintFontColor,
  DefaultMargin,
} from "../config/themeConfig";
import NativeView from "./NativeView";
import Typography from "./Typography";

interface IProps {
  title: string;
  subTitle?: string;
  defaultExpanded?: boolean;
}

export const NativeAccordion: React.FunctionComponent<IProps> = ({
  defaultExpanded,
  title,
  children,
  subTitle,
}) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded ?? false);

  return (
    <NativeView
      padding={DefaultMargin / 2}
      borderColor={DeafultBorderColor}
      borderWidth={1}
      margin={DefaultMargin / 2}
      borderRadius={DefaultBorderRadius}
    >
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>
                <Typography type="h3" family="medium">
                  {title}
                </Typography>
                <NativeView>
                  <Typography
                    color={DefaultHintFontColor}
                    type="xs"
                    marginLeft={DefaultMargin / 2}
                  >
                    {subTitle}
                  </Typography>
                </NativeView>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          <ListItem.Content>{children}</ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </NativeView>
  );
};

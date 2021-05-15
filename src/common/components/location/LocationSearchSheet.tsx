import {
  PlaceAutocompleteResponse,
  PlaceAutocompleteResult,
  PlaceDetailsResponse,
  ReverseGeocodingResponse,
} from "@google/maps";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";
import { View, StyleSheet, ScrollView } from "react-native";
import { Icon, ListItem, SearchBar } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import LocationResult from "../../../models/LocationResult";
import { DefaultMargin, DefaultIconFamily } from "../../config/themeConfig";
import { showToast } from "../../helpers/notification";
import { getGeoJSON } from "../../helpers/transform";
import usePlacesAPI from "../../hooks/usePlacesAPI";
import { ToastTitle } from "../../models/enum";
import GeoJSON from "../../models/GeoJSON";
import IconButton from "../IconButton";
import NativeTextInput from "../NativeTextInput";
import NativeView from "../NativeView";
import { VericalSpacer } from "../VericalSpacer";
import { getCurrentPosition } from "../../helpers/platform";
import { delay } from "../../helpers/misc";

export interface ILocationSearchSheetProps {
  value?: string;
  onSelected(result: LocationResult): void;
  noSearch?: boolean;
  onInit?: (refRBSheet: any) => void;
}

export default function LocationSearchSheet(props: ILocationSearchSheetProps) {
  const { onSelected, noSearch, onInit } = props;
  const refRBSheet = useRef<any>();
  const [token, setToken] = useState<string>("");
  const [placesList, setPlacesList] = useState<PlaceAutocompleteResult[]>([]);
  const [value, setValue] = useState<string>(props.value ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useRef<GeoJSON>();
  const { searchPlace, getPlace, getPlaceFromCoordinates } = usePlacesAPI();

  useEffect(() => {
    setToken(uuidv4());
    onInit && onInit(refRBSheet.current);
  }, []);

  const onSearch = async (search: string) => {
    setValue(search);
    if (isEmpty(search)) {
      return;
    }
    setIsLoading(true);
    const placeResult = await searchPlace(search, token);
    setPlacesList(placeResult.payload.predictions);
    setIsLoading(false);
  };

  const getGpsLocation = async () => {
    setIsLoading(true);
    try {
      const position = await getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const geoResult = await getPlaceFromCoordinates(lat, lng);
      location.current = getGeoJSON(lat, lng);
      const placeListResult: PlaceAutocompleteResult[] = (geoResult.payload
        .results as any[]).map<PlaceAutocompleteResult>(
        (place) =>
          ({
            description: place.formatted_address,
            place_id: "",
          } as PlaceAutocompleteResult)
      );
      setPlacesList(placeListResult);
    } catch (err) {
      showToast(
        ToastTitle.PermissionError,
        "Error retrieving  location",
        "error"
      );
      console.log(err);
    }
    setIsLoading(false);
  };

  const onPlaceSelected = async (place: PlaceAutocompleteResult) => {
    setValue(place.description);
    await delay(200);
    if (isEmpty(place.place_id) && location.current) {
      // used device location to get coordinates so GPS will be present in state
      onSelected({
        address: place.description,
        location: location.current,
      });
    } else {
      // manual search for location
      const placeResult = await getPlace(place.place_id);
      onSelected({
        address: place.description,
        location: getGeoJSON(
          placeResult.payload.result.geometry.location.lat,
          placeResult.payload.result.geometry.location.lng
        ),
      });
    }
    refRBSheet.current.close();
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={250}
    >
      <View style={styles.bottomSheetContainer}>
        <NativeView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <NativeView flex={1}>
            {!noSearch && (
              <NativeTextInput
                iconName="search-outline"
                placeholder="Search    "
                value={value}
                onChangeText={onSearch}
                size="sm"
              />
            )}
          </NativeView>
          <NativeView
            marginLeft={DefaultMargin}
            width={40}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              onPress={getGpsLocation}
              gradient
              iconName="locate-outline"
              iconColor="white"
              size={30}
              isLoading={isLoading}
            />
          </NativeView>
        </NativeView>
        <VericalSpacer height={DefaultMargin / 2} />
        <ScrollView>
          {placesList.map((result, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={() => onPlaceSelected(result)}
            >
              <Icon name="location-outline" type={DefaultIconFamily} />
              <ListItem.Content>
                <ListItem.Subtitle>{result.description}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron
                type={DefaultIconFamily}
                name="chevron-forward-outline"
              />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: DefaultMargin,
  },
  searchContainerStyle: { margin: 10, borderRadius: 10 },
  searchInputContainerStyle: {
    margin: -10,
    borderRadius: 10,
  },
  gpsButton: {
    marginLeft: 10,
  },
  locationTextContainer: {
    flexDirection: "row",
    marginLeft: -1,
  },
  icon: {
    marginRight: DefaultMargin / 5,
    justifyContent: "center",
  },
  gpsIconContainer: {},
});

import React, { useCallback, useEffect, useRef, useState } from "react";
import useModal from "../hooks/useModal";
import CameraPreview from "./CameraPreview";
import ImagePicker from "./ImagePicker";
import NativeCamera from "./NativeCamera";
import { StyleSheet, View } from "react-native";
import useFilesUploader from "../hooks/useFilesUploader";
import NativeButton from "./NativeButton";
import { requestPermission } from "../helpers/platform";

interface IProps {
  value?: string[];
  readonly?: boolean;
  progressList?: number[];
  onChange: (uriList: string[]) => void;
  onLongPressImage?: (url: string) => void;
}

export default function ImageInput(props: IProps) {
  const { value, readonly, onChange, onLongPressImage, progressList } = props;
  const [selectedUri, setSelectedUri] = useState<string>("");
  const cameraModal = useModal();
  const previewModal = useModal();
  const uriSetRef = useRef(new Set<string>(value));
  const [uriList, setUriList] = useState<string[]>(value ?? []);

  const onAddImagePress = () => {
    cameraModal.open();
  };
  const onCapture = (uri: string) => {
    requestPermission("read_external_storage");
    setSelectedUri(uri);
    previewModal.open();
    cameraModal.close();
  };

  const onSelected = (uri: string) => {
    uriSetRef.current.add(uri);
    onChange(Array.from(uriSetRef.current));
    setUriList(Array.from(uriSetRef.current));
    previewModal.close();
  };

  useEffect(() => {
    uriSetRef.current = new Set<string>(value);
    setUriList(Array.from(uriSetRef.current));
  }, [value]);

  return (
    <>
      <ImagePicker
        onAddImagePress={onAddImagePress}
        uriList={uriList}
        readonly={readonly}
        progressList={progressList}
        onLongPressImage={onLongPressImage}
      />
      <cameraModal.Modal>
        <View style={styles.modalContainer}>
          <NativeCamera onCapture={onCapture} />
        </View>
      </cameraModal.Modal>
      <previewModal.Modal>
        <View style={styles.modalContainer}>
          <CameraPreview uri={selectedUri} onSelected={onSelected} />
        </View>
      </previewModal.Modal>
    </>
  );
}

type Modes = "input" | "capture" | "preview";

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
});

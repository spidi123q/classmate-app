import { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { useCallback, useRef, useState } from "react";
import { FileTypes } from "../helpers/files";
import { uploadFiles } from "../helpers/firebaseStorage";

export default function useFilesUploader(fileType: FileTypes) {
  const [progressList, setProgressList] = useState<number[]>();
  const taskRef = useRef<FirebaseStorageTypes.Task[]>();

  const onProgress = (progress: number[]) => {
    console.log("onProgress -> progressList", progress, progressList);
    setProgressList([...progress]);
  };

  const onTasksCreated = (tasks: FirebaseStorageTypes.Task[]) => {
    taskRef.current = tasks;
  };

  const startAll = async (pathToFiles: string[]): Promise<string[]> => {
    const result = await uploadFiles(
      fileType,
      pathToFiles,
      onProgress,
      onTasksCreated
    );
    return result;
  };

  const cancelAll = async () => {
    if (!taskRef.current) {
      return;
    }
    try {
      // To reset progress to infinite loop
      setProgressList(progressList?.map(() => 0));
      taskRef.current.forEach(async (task) => await task.cancel());
    } catch (err) {
      console.log(err.message);
    }
    // To remove progress
    setProgressList(undefined);
  };

  return {
    startAll,
    cancelAll,
    progressList,
  };
}

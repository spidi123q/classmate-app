import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { DefaultThumbnailSize } from "../config/themeConfig";
import { FileTypes, getStoragePath } from "./files";
import { resizeImage } from "./image";

export const ImageRefPrefix = "user-data/images";
export const ThumbImageRefPrefix = `${ImageRefPrefix}/thumb`;
const ThumSize = DefaultThumbnailSize + 0.5 * DefaultThumbnailSize;

const ImageReferencePath = () =>
  `${ImageRefPrefix}/${uuidv4()}|${new Date().toISOString()}.jpg`;

const StoragePathMap: Record<FileTypes, () => string> = {
  image: ImageReferencePath,
};

/**
 * Upload file to Firebase Storage
 * @param type File category
 * @param pathToFile Device location of the file
 * @param onProgress Callback for upload progress (0 - 100)
 * @param onTasksCreated Callback for task
 * @returns Firebase storage reference
 */
export const uploadFile = async (
  type: FileTypes,
  pathToFile: string,
  refPath?: string,
  onProgress?: (progress: number) => void,
  onTasksCreated?: (tasks: FirebaseStorageTypes.Task) => void
): Promise<string> => {
  const pathRef = refPath ?? StoragePathMap[type]();
  const uri = await getStoragePath(pathToFile);
  const task = storage().ref(pathRef).putFile(uri);
  onTasksCreated && onTasksCreated(task);
  await uploadEvents(task, onProgress);
  return pathRef;
};

/**
 * Upload files to Firebase Storage
 * @param type File category
 * @param pathToFiles List of device location of the files
 * @param onProgress Callback for upload progress [(0 - 100)]
 * @param onTasksCreated Callback for list of tasks created
 * @returns List of firebase storage reference
 */
export const uploadFiles = async (
  type: FileTypes,
  pathToFiles: string[],
  onProgress?: (progressList: number[]) => void,
  onTasksCreated?: (tasks: FirebaseStorageTypes.Task[]) => void,
  noThumb?: boolean
): Promise<string[]> => {
  console.log("Upload initiated");
  const refPaths: string[] = [];
  const progressList: number[] = pathToFiles.map(() => 0);
  onProgress && onProgress(progressList);
  const promiseList: Promise<any>[] = [];
  const taskList: FirebaseStorageTypes.Task[] = [];
  for (const pathToFile of pathToFiles) {
    const refPath = StoragePathMap[type]();
    // Saving for future reference
    refPaths.push(refPath);

    if (!noThumb) {
      //Generate thumbnail and upload
      const thumbUri = await resizeImage(pathToFile, 50, ThumSize);
      console.log("thumbUri", thumbUri);
      const uri = await getStoragePath(thumbUri);
      await uploadFile(type, uri, getThumbRef(refPath));
    }

    // Compress image
    const imageUri: string = await resizeImage(pathToFile, 60);
    const uri = await getStoragePath(imageUri);
    const task = storage().ref(refPath).putFile(uri);

    // Generate events to hangle progress
    promiseList.push(
      uploadEvents(task, (progress) => {
        const index = pathToFiles.indexOf(pathToFile);
        progressList[index] = progress;
        onProgress && onProgress(progressList);
      })
    );

    taskList.push(task);
  }
  onTasksCreated && onTasksCreated(taskList);
  await Promise.all(promiseList);
  return refPaths;
};

const uploadEvents = async (
  task: FirebaseStorageTypes.Task,
  progressCallback?: (progress: number) => void
) => {
  return new Promise((resolve: any, reject) => {
    task.on("state_changed", ({ bytesTransferred, totalBytes }) => {
      const progress = (bytesTransferred / totalBytes) * 100;
      console.log(
        `Progress: ${progress}% - ${bytesTransferred} transferred out of ${totalBytes}`
      );
      progressCallback && progressCallback(progress);
    });

    task.then(() => {
      console.log("Image uploaded to the bucket!");
      resolve();
    });
  });
};

export const getThumbRef = (refPath: string): string =>
  refPath.replace(ImageRefPrefix, ThumbImageRefPrefix);

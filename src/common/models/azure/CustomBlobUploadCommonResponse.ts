export default interface ICustomBlobUploadCommonResponse {
  etag?: string;

  lastModified?: Date;

  contentMD5?: Uint8Array;

  clientRequestId?: string;

  requestId?: string;

  version?: string;

  versionId?: string;

  date?: Date;

  isServerEncrypted?: boolean;

  encryptionKeySha256?: string;

  encryptionScope?: string;

  errorCode?: string;

  url: string;

  account?: string;

  containerName?: string;

  location?: string;
}

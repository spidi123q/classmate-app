import {
  EncryptionScheme,
  StreamingPolicyStreamingProtocol,
} from "./mediaServices";

export default interface ICustomStreamingPath {
  streamingProtocol: StreamingPolicyStreamingProtocol;
  encryptionScheme: EncryptionScheme;
  paths?: string[];
  path?: string;
  endpoint?: string;
}

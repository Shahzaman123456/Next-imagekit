export interface IKUploadResponse {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  version: number;
  filePath: string;
  url: string;
  thumbnailUrl?: string;
  height?: number;
  width?: number;
  fileType: string;
  hasAlpha?: boolean;
  mime: string;
}

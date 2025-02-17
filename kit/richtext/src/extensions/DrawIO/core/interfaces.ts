interface DrawIoAttributes {
  drawIoCode: string | null;
  drawIoName: string | null;
}

interface DrawIoStorage {
  includedFiles: string[];
}

interface DrawIoConfig {
  dataTestId?: string;
  drawIoLink?: string | null;
  viewFile?: (fileId: string, version?: string) => Promise<string>;
  uploadFile?: (file: File) => Promise<DrawIoAttributes>;
  updateFile?: (attrs: DrawIoAttributes, file: File) => Promise<DrawIoAttributes>;
}

export type { DrawIoAttributes, DrawIoStorage, DrawIoConfig };

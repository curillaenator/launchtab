import type { DrawIoConfig } from '../extensions/DrawIO/core/interfaces';

export const useCanUploadDrawIo = ({ viewFile, drawIoLink, uploadFile, updateFile }: DrawIoConfig | undefined = {}) =>
  !!drawIoLink && !!viewFile && !!uploadFile && !!updateFile;

export enum MediaType {
  image,
  video,
}

const VideoExtensions = new Set([
  '3g2',
  '3gp',
  'amv',
  'asf',
  'avi',
  'drc',
  'f4a',
  'f4b',
  'f4p',
  'f4v',
  'flv',
  'gif',
  'gifv',
  'm2ts',
  'm2v',
  'm4p',
  'm4v',
  'mkv',
  'mng',
  'mov',
  'mp2',
  'mp4',
  'mpe',
  'mpeg',
  'mpg',
  'mpv',
  'mts',
  'mxf',
  'net',
  'nsv',
  'ogg',
  'ogv',
  'qt',
  'rm',
  'rmvb',
  'roq',
  'svi',
  'vob',
  'webm',
  'wmv',
  'yuv',
]);

export function getMediaType(fileName: string): MediaType {
  const fileExt = getFileExt(fileName);
  return fileExt && VideoExtensions.has(fileExt)
    ? MediaType.video
    : MediaType.image;
}

function getFileExt(fileName: string = '') {
  const fileParts = fileName.split('.');
  if (fileParts.length === 1) {
    return;
  }
  return fileParts[fileParts.length - 1];
}

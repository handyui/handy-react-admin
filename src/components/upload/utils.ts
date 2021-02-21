const now = +new Date();
let index = 0;

export const getUid=()=> {
  // eslint-disable-next-line no-plusplus
  return `upload-${now}-${++index}`;
}

export function getFileItem(file:any, fileList: any[]) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}
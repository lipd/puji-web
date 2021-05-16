export const licenseTable = {
  'to-change': '允许修改',
  'to-commertial': '允许商用',
  'to-share': '允许分享',
  'to-personal': '允许个人使用',
}

export const instrumentTable = {
  keyboard: '键盘',
  string: '弦乐',
  wind: '管乐',
  percussion: '打击乐',
  vocal: '声乐',
  band: '乐队',
  other: '其他',
}

export const genreTable = {
  classical: '古典',
  pop: '流行',
  jazz: '爵士',
  country: '乡村',
  rock: '摇滚',
  chinese: '民乐',
  'world-music': '世界音乐',
  other: '其他',
}

export const translator: { [key: string]: string } = {
  ...licenseTable,
  ...instrumentTable,
  ...genreTable,
}

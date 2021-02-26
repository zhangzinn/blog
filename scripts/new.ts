const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');

const fileName = `${dayjs().format('YYYYMMDDHHmmss')}_.md`;
const markdownDir = path.resolve(process.cwd(), 'data');
fs.writeFileSync(`${markdownDir}/${fileName}`, '', { encoding: 'utf8' });

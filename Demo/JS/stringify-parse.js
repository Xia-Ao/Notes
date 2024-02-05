
function jsonStringify(obj) {
  const type = typeof obj;
  if (type !== 'object' || obj === null) {
    if (/string|undefined/.test(type)) {
      obj = `"${obj}"`
    }
    return `${obj}`;
  } else {
    const isArr = Array.isArray(obj);
    const res = [];

    for (const key in obj) {
      let v = obj[key];
      const type = typeof v;
      if (/string|undefined/.test(type)) {
        v = `"${v}"`
      } else if (type === 'object') {
        v = jsonStringify(v);
      }
      res.push(`${isArr ? '' : `"${key}":`}${String(v)}`);
    }
    return `${isArr ? '[' : '{'}${String(res)}${isArr ? ']' : '}'}`
  }
}
function jsonParse(jsonStr) {
  let i = 0;
  let curChar = jsonStr[i]

  // 步进器
  function next() {
    i += 1;
    curChar = jsonStr[i];
  }

  function parseValue() {
    switch (curChar) {
      case '"':
        return parseString()
      case "{":
        return parseObject();
      case '[':
        return parseArray();
      default:
        return parseOther();
    }
  }

  function parseString() {
    let str = '';
    next()
    while (jsonStr[i] !== '"') {
      str += jsonStr[i];
      i++;
    }
    next();
    return str === 'undefined' ? undefined : str;
  }

  function parseArray() {
    let arr = [];
    next();
    while (curChar !== ']') {
      arr.push(parseValue());
      if (curChar === ',') {
        // 跳过, 下一个
        next();
      }
    }
    next();
    return arr;
  }
  function parseObject() {
    let obj = {};
    next();
    while (curChar !== '}') {
      let key = parseString();
      next();
      let value = parseValue();
      obj[key] = value;
      if (curChar === ',') {
        // 跳过
        next();
      }
    }
    next();
    return obj;
  }
  function parseOther() {
    let str = '';
    while (curChar !== ',' && curChar !== ']' && curChar !== '}') {
      str += curChar;
      next();
    }
    if (!isNaN(str)) return Number(str);
    if (str === 'null') return null;
    if (str === 'true') return true;
    if (str === 'false') return false;
    return str;
  }

  return parseValue()
}

const aa = {
  a: 1,
  b: 'str',
  c: [1, 23],
  e: undefined,
  f: null,
  g: true,
  h: false,
  d: {
    da: 1,
    db: 'str',
    dc: [1, 23],
    dd: {
      da: 1,
      db: 'str',
      g: true,
      dc: [1, 23],
      dd: {}
    }
  }
}

const str = jsonStringify(aa);
console.log(str);
console.log(jsonParse(str))
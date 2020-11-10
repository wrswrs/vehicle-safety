import { NAMESPACE } from '@/settings';
import dayjsLib from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

export const dayjs = dayjsLib;
dayjs.extend(updateLocale);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
dayjs.updateLocale('zh-cn', { weekStart: 1 });
// window.dayjs = dayjs;

/** 序列化JSON (可处理函数) */
export const stringify = (obj: unknown) => JSON.stringify(obj, (k, v) => {
  if (typeof v === 'function') {
    const s = v.toString();
    return `${s.slice(0, 8) === 'function' ? '__dd__' : '__dd__function '}${s.replace(/([\n \W']) +| +(\W)/g, '$1$2')}`;
  } return v;
});

/** 反序列化JSON (可处理函数) */
export const parse = (str: string) => {
  try {
    return JSON.parse(str, (k, v) => {
      if (typeof v === 'string') {
        if (/^__dd__function\b/.test(v)) {
          const [, name, args, func] = v.match(/^__dd__function(?:\s+(\S+?)\s*)?\(([\s\S]*?)\)\s*\{([\s\S]*)\}$/) || [];
          if (!func) return v;
          // eslint-disable-next-line no-new-func
          const f = new Function(args.trim(), func.trim());
          return name ? Object.defineProperty(f, 'name', { value: name }) : f;
        } if (/^__dd__date\b/.test(v)) return new Date(Number.parseInt(v.slice(10), 10));
      }
      return v;
    });
  } catch (e) {
    return undefined;
  }
};

/**
 * 存储本地数据 (localStorage 或 sessionStorage)
 * @param name 数据项名称
 * @param content 数据值(可包含函数)
 * @param useSessionStorage 为true时存sessionStorage, 否则存localStorage
 */
export const setStore = (name: string, content: unknown, useSessionStorage = false) => {
  window[useSessionStorage ? 'sessionStorage' : 'localStorage'].setItem(`${NAMESPACE}_${name.trim()}`, stringify({
    content, datetime: new Date(),
  }));
  return content;
};

/**
 * 读取本地存储数据 (查找 sessionStorage 或 localStorage, 前者优先)
 * @param name 数据项名称
 */
export const getStore = (name: string) => {
  const key = `${NAMESPACE}_${name.trim()}`;
  const val = window.sessionStorage.getItem(key) || window.localStorage.getItem(key) || '';
  const { content } = parse(val) || {};
  return content;
};

/**
 * 删除本地存储数据
 * @param name 数据项名称
 */
export const removeStore = (name: string) => {
  const key = `${NAMESPACE}_${name.trim()}`;
  window.sessionStorage.removeItem(key);
  window.localStorage.removeItem(key);
};

/**
 * 清空本地存储的命名空间下数据
 */
export const clearStore = () => {
  const regexp = new RegExp(`^${NAMESPACE}_`);
  [window.sessionStorage, window.localStorage].forEach((s) => {
    Object.keys(s).forEach((k) => { if (regexp.test(k)) s.removeItem(k); });
  });
};

/** 生成uuid */
const uuidCache: Record<string, string> = {};
export const uuid = (id?: string) => {
  if (id && uuidCache[id]) return uuidCache[id];
  // eslint-disable-next-line no-bitwise
  const u = '00000000-0000-4000-8000-000000000000'.replace(/0|8/g, (c) => (+c ^ Math.random() * 16 >> +c / 4).toString(16));
  if (id) uuidCache[id] = u;
  return u;
};

// export const setPx = (val: number | string, defval: number | string = '') => {
//   const v = val || val === 0 ? `${val}` : defval;
// };
//   return v ? `${v}${Number.isFinite(+v) ? 'px' : ''}` : '';

const superDigits = '⁰¹²³⁴⁵⁶⁷⁸⁹';
export const roundNum = (v: number | string = '--', precision = 3) => {
  const val = Number(v);
  if (Number.isNaN(val) || v === '') return typeof v === 'string' ? v : '--';
  const absVal = Math.abs(val);
  if (absVal < (10 ** (precision - 1))) return Number(val.toPrecision(precision));
  if (absVal > 1e9) return val.toExponential(precision).replace(/^([\d.]+)e\+?(-?\d+)$/, (e, a, m) => `${+a}×10${m.split('').map((x: 'string') => superDigits[+x]).join('')}`);
  return +val.toFixed(1);
};

export const sortName = (a = '', b = '') => { // 字符串比较: 各处数字字符串按数值比较 忽略连续空格
  let r = (b ? 1 : 0) - (a ? 1 : 0);
  if (r) return r;
  const [ta, tb] = [a, b].map((e) => e.replace(/\s+/, ' ').split(/\d+/));
  const [na, nb] = [a, b].map((e) => (+e[0] >= 0 ? e.split(/\D+/) : e.split(/\D+/).slice(1)));
  return ta.some((e, i) => {
    r = e.trim().localeCompare((tb[i] || '').trim(), 'zh') || Number(na[i]) - Number(nb[i]);
    return r;
  }) ? r : 0;
};

const gaussian = () => Array.from({ length: 12 }).map(() => Math.random()).reduce((a, b) => a + b, -6);
export const getRandomData = () => {
  const rand = Array.from<number>({ length: 24 }).map((e, i, a) => (a[i - 1] || 100) + gaussian() * 20);
  return rand.map((e, i) => [1583510400 + i * 3600, e, Math.random() > 0.95 ? 1 : 0]);
};

export const unixToString = (t: any) => (Number.isFinite(Number.parseFloat(t)) ? dayjs(Number.parseFloat(t)).format('YYYY-MM-DD HH:mm:ss') : '--');
export const unixToStringRel = (t: any) => (Number.isFinite(Number.parseFloat(t)) ? dayjs(Number.parseFloat(t)).fromNow() : '--');

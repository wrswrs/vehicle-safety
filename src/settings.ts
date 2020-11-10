/** api请求地址前缀 */
export const BASE_URL = (window as any).BASE_URL || process.env.VUE_APP_BASE_URL || '';

/** 权限认证方式 */
export const AUTH: 'cookie' | 'sid'| 'none' = process.env.VUE_APP_AUTH as ('cookie' | 'sid'| 'none') || 'sid';

/** 本地存储数据使用的命名空间(变量前缀) */
export const NAMESPACE = process.env.VUE_APP_NAMESPACE || 'vue'

/** 自定义组件的所有类型 ( [base, data, layout, ...] ) */
export const COMPONENT_TYPES: string[] = (process.env.VUE_APP_COMPONENT_TYPES || '').split(',');

/** 打包时间戳 */
export const VUE_APP_BUILD_TIME: string = process.env.VUE_APP_BUILD_TIME || '0';

/** 加载模板配置及相关样式超时间见 */
export const LOAD_TIMEOUT = 10000;

/** 是否开启vue调试工具 */
export const ENABLE_DEVTOOLS = process.env.NODE_ENV !== 'production' || process.env.VUE_APP_DEBUG === '1';

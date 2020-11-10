declare namespace Vuex {
  //=================================================
  interface Permission {
    authName: string
    manage: Auth
    edit: Auth
    children?: Child[]
  }

  interface Child {
    authName: string
    manage: Auth
    edit: Auth
    children: any[]
  }

  interface Auth {
    show: boolean
    disable: boolean
    checked: boolean
  }

  //---------------------------------------------------------
  export interface LogForm {
    userName?: string
    dateRange?: any[]
    description?: string
    type?: string
  }
  export interface LogSearchCondition {
    userName?: string
    operatorBeginDate?: string
    operatorEndDate?: string
    description?: string
    type?: string
  }

  export interface Module {
    namespaced?: boolean
    state?: any
    getters?: any
    actions?: any
    mutations?: any
    modules?: any
  }

  interface UserPermission {
    authCode: string
    authName: string
    id?: string
    authDetail?: UserPermission[] | null
    [propName: string]: any
  }
  export interface UserState {
    user_info: UserInfo | null
    menus: Menu[] | null
  }
  export interface Menu {
    id: string
    menuTitle: string
    menuRouteName: string
    menuIcon: string
    menuPath: string
    menuSort: number
    [propName: string]: any
  }

  export interface UserInfo {
    permission: any[]
    menus?: Menu[]
    userName: string
    manage: any[]
  }

  //基础章节数

  interface OrgNode {
    danweicengji: string
    jiancheng?: string
    leixing: string
    leixingmingcheng?: string
    paixuma?: number
    quancheng: string
    sequence_number?: any
    shangjizhujian?: string
    xunizuzhi?: boolean
    zhujian?: string
    zuzhibianma: string
    zuzhilujing: string
    id: string
    [propName: string]: any
  }

  // 章节管理权限树
  export interface ChapterManageNode extends OrgNode {
    children?: ChapterManageNode[]
  }

  //章节授权树
  export interface UserAuthNode extends OrgNode {
    permissionDetail: string[]
    children?: UserAuthNode[]
  }

  // elTree原生节点结构
  export interface ChapterELNode {
    checked: boolean
    childNodes: ChapterELNode[]
    data: any
    expanded: boolean
    id: string | number
    indeterminate: boolean
    isLeaf: boolean
    level: number
    parent: ChapterELNode | null
    [propName: string]: any
  }

  //章节成员
  export interface Member {
    memberId?: string
    memberName: string
    memberOrgCode: string
    memberOrgName: string
    memberType: string
    extends?: boolean
    add?: boolean
    edit?: boolean
    delete?: boolean
    deploy?: boolean
    view?: boolean
    updateTime?: any
    version?: number
    [propName: string]: any
  }
}

interface IResponse {
  code: number
  message?: string
  data?: any
}

interface IBaseWorkCenterModule {
  current_page: number
  page_size: number
  total: number
  table_columns: any[]
  table_rows: any[]
  table_loading: boolean
  current_row?: any
  selected_rows: any[]
}
interface UserPermission {
  authMap: any
  authCode: any
}

interface APIResponse {
  data: any
  message: string
  success: boolean
}

type Router = RouterBase | RouterHasMeta
interface RouterBase {
  path: string
  component?: any
  children?: Router[]
  [propName: string]: any
}
interface RouterHasMeta extends RouterBase {
  meta: {
    title: string
    name?: string
    code?: string
    icon?: string
  }
}

//接口获取到的有权限的菜单
interface IApiMenus {
  updatedTime: string
  code: string
  updatedPerson: string
  menuGrantType?: any
  menuIcon: string
  menuPath: string
  menuTitle: string
  remark?: any
  version: string
  parentCode?: any
  children: IApiMenusChild[]
  menuRouteName: string
  menuRegular?: any
  createdTime: string
  createdPerson: string
  id: string
  ifUse?: any
  menuSort: string
  [propsName: string]: any
}

interface IApiMenusChild {
  updatedTime: string
  code: string
  updatedPerson: string
  menuGrantType?: string
  menuIcon: string
  menuPath: string
  menuTitle: string
  remark?: any
  version: string
  parentCode: string
  menuRouteName: string
  menuRegular?: any
  createdTime: string
  createdPerson: string
  id: string
  ifUse?: any
  menuSort: string
}

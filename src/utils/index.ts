

/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */
export const TOKEN_KEY = 'han_token'

// export const debounce=(func:any, wait:number, immediate = false)=>{
//   let timeout:any
//   return function(...args){
//     const callnow = immediate && !timeout
//     timeout && clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       timeout = null
//       if(!immediate) func.apply(this, args);
//     }, wait);
//     if(callnow) func.apply(this, args)
//   }
// }


export const setStorage = (key:string, value:any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key:string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}

export const removeStorage = (key:string) => {
  return localStorage.removeItem(key)
}

/**
 * @param {Array} tree 
 * @param {String} path 
 */
export const genPath = (tree:any, path:string)=> {
  let arr:any = []
  function func(tree:any, path:any = null) {
    tree.forEach((item:any) => {
      if (path) {
        if (item.path === path) {
          arr.push(path);
        } else {
          return;
        }
      } else {
        arr.push(item.path);
      }
      if (item.children) {
        func(item.children);
      }
    });
  }
  func(tree, path)
  return arr
}


/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url:string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj:any = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  if (node) {
    return node.parentNode as HTMLElement;
  }
  return document.body;
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === '[object Object]'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description: 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * @description: es6数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}


/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
      const copyInput = document.createElement("input"); //创建一个input框获取需要复制的文本内容
      copyInput.value = text;
      document.body.appendChild(copyInput);
      copyInput.select();
      document.execCommand("copy");
      copyInput.remove()
      resolve(true);
  })
}



/**
 * 组织树改变字段
 * @param org 
 */
export const mapTree = (org:any) => {
  const haveChildren = Array.isArray(org.children) && org.children.length > 0;
  return {
　　　　 //分别将我们查询出来的值做出改变他的key
      title: org.orgName,
      key: org.id,
      //判断它是否存在子集，若果存在就进行再次进行遍历操作，知道不存在子集便对其他的元素进行操作
      children: haveChildren ? org.children.map((i:any) => mapTree(i)) : [],
      value: org.orgCode,
  }
}


/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
// export const treeDataTranslate = (data:any, id = 'id', pid = 'parentId') =>{
  // var res = []
  // var temp = {}
  // for (var i = 0; i < data.length; i++) {
  //   temp[data[i][id]] = data[i]
  // }
  // for (var k = 0; k < data.length; k++) {
  //   if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
  //     if (!temp[data[k][pid]]['children']) {
  //       temp[data[k][pid]]['children'] = []
  //     }
  //     if (!temp[data[k][pid]]['_level']) {
  //       temp[data[k][pid]]['_level'] = 1
  //     }
  //     data[k]['_level'] = temp[data[k][pid]]._level + 1
  //     temp[data[k][pid]]['children'].push(data[k])
  //   } else {
  //     res.push(data[k])
  //   }
  // }
  // return res
// }



/**
 * 异步生成菜单树
 * @param dataList
 */
export const list2tree = (items:any, parentId = 0, arr = []) => {
  return (items||[]).filter((item:any) => item.parentId === parentId).map((item: any) => {
      const {icon, title, menuPath, hidden} = item
      const path = menuPath.startsWith('/') ? menuPath : '/' + menuPath

      return {
          path: path,
          // 路由名称，建议唯一
          name: path || '',
          children: list2tree(items, item.menuId, []),
          // 该路由对应页面的 组件 (动态加载)
          component: (() => import('@/pages/error/404.tsx')),
          props: true,
          // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
          meta: {
            title,
            icon,
            hidden: hidden === 1 ? 1:0
              // hiddenHeaderContent: hiddenHeaderContent,
              // permission: item.actions || []
              // TODO 简单模拟CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作，可以自行修改查看页面效果
              // permission: parentId == -1
              //     ? []
              //     : ['create', 'update', 'retrieve', 'delete' ].map(n => `${url.split('/').filter(m => m.trim() != '').join('.')}.${n}`)
          }
      }
  })
}

// export const debounce=(func:any, wait:any, immediate = false)=>{
//   let timeout:any
//   return function(){
//     const callnow = immediate && !timeout
//     timeout && clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       timeout = null
//       if(!immediate) func.apply(this as any, arguments as any)
//     }, wait);
//     if(callnow) func.apply(this as any, arguments)
//   }
// }
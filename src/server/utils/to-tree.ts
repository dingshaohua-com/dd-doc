/**
 * 将扁平数组转换为树形结构的函数类型
 * @template T - 数组元素类型
 */
type ToTree = <T extends Record<string, any>>(
  /**
   * 扁平数据数组
   */
  flatArray: T[],
  /**
   * 配置选项
   */
  options?: {
    /**
     * 节点ID的属性名 (默认: 'id')
     */
    idKey?: string;
    /**
     * 父节点ID的属性名 (默认: 'pid') 
     */
    parentKey?: string;
    /**
     * 子节点数组的属性名 (默认: 'children')
     */
    childrenKey?: string;
    /**
     * 根节点的父ID值 (默认: 0)
     */
    rootValue?: any;
  }
) => (T & { [key: string]: any })[]; // 返回带子节点数组的树形结构

/**
 * 将扁平数组转换为树形结构
 * @param {Array} flatArray 扁平数据数组
 * @param {Object} options 配置项
 * @param {string} [options.idKey='id'] 节点ID键名
 * @param {string} [options.parentKey='pid'] 父节点ID键名
 * @param {string} [options.childrenKey='children'] 子节点键名
 * @param {number|null} [options.rootValue=0] 根节点的父ID值
 * @returns {Array} 树形结构数组
 */
const toTree:ToTree = (flatArray, options = {}) => {
  const {
    idKey = "id",
    parentKey = "pid",
    childrenKey = "children",
    rootValue = 0,
  } = options;

  // 创建ID到节点的映射
  const map = {};
  flatArray.forEach((item) => {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  });

  // 构建树形结构
  const tree = [];
  flatArray.forEach((item) => {
    const parentId = item[parentKey];

    if (parentId === null || parentId === rootValue) {
      tree.push(map[item[idKey]]);
    } else if (map[parentId]) {
      map[parentId][childrenKey].push(map[item[idKey]]);
    }
  });

  return tree;
};

export default toTree;
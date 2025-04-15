// 在 get 请求中不建议前端传递复杂对象，约定好后后端自己提取
// console.log(extractAndLowerFirst("includeBook")); // "book"
// console.log(extractAndLowerFirst("include"));     // null
// console.log(extractAndLowerFirst("abc"));     // null
const getInclude = (str) => {
  const match = str.match(/^include([A-Z]\w*)/);
  return match ? match[1].charAt(0).toLowerCase() + match[1].slice(1) : null;
};

// 重组参数，将params 里的 includeXX 提出
export const reoParams = (params) => {
  const result = {
    other: {},
    include: {},
  };
  Object.keys(params).forEach((key) => {
    const isInclude = getInclude(key);
    if (isInclude) {
      result.include[isInclude] = true;
      // delete params[key];
    } else {
      result.other[key] = params[key];
    }
  });
  return result;
};

export const genPrismaFindParams = (params) => {
  const prismaParams = {
    include: {},
    where: {},
  };

  Object.keys(params).forEach((key) => {
    const isInclude = getInclude(key);
    if (isInclude) {
      prismaParams.include[isInclude] = true;
      // delete params[key];
    } else {
      prismaParams.where[key] = params[key];
    }
  });
  return prismaParams;
};

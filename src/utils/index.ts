/**
 * @description: 获取树的深度
 * @param {*} node
 * @return {*}
 */
export function getTreeDepth(node) {
  if (!Array.isArray(node) || node.length === 0) {
    return 1
  } else {
    let maxDepth = 0
    for (let i = 0; i < node.length; i++) {
      const depth = getTreeDepth(node[i])
      if (depth > maxDepth) {
        maxDepth = depth
      }
    }
    return maxDepth + 1
  }
}

export function flatten(list) {
  let result = []
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    if (element.children) {
      result = [...result, element, ...flatten(element.children)]
    } else {
      result.push(element)
    }
  }
  return result
}

export function addLevelIdAndNameToLeaves(data) {
  // 创建一个对象，用于记录每个节点的父节点
  const parentMap = {}
  data.forEach(node => {
    parentMap[node.id] = node.parentId
  })

  // 找到所有的叶子节点
  const leaves = data.filter(node => node.parentId > 10)

  // 为每个叶子节点设置 level id 和 level name
  leaves.forEach(leaf => {
    let parentId = parentMap[leaf.id]
    let level = 1
    while (parentId !== null) {
      const parentNode = data.find(n => {
        return n.id === parentId
      })
      if (!parentNode) {
        break
      }
      leaf[`level_${level}_name`] = parentNode.name
      leaf[`level_${level}_id`] = parentNode.id
      parentId = parentNode.parent_id
      level++
    }
  })

  return leaves
}

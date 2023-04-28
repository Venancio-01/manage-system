import { useStore } from '@/store'
import { getReasons } from '@/api/outing/reason'
import { getRegions } from '@/api/misc/region'
import { getDepartments } from '@/api/misc/department'
import { getAccidentTypes, getAccidentLevels } from '@/api/accident'
import { getDisciplineTree } from '@/api/discipline'

export default () => {
  const store = useStore()
  const { setReasons, setRegions, setDepartments, setAccidentTypes, setAccidentLevels, setDisciplineTree } = store

  const handleRequestBasicData = async () => {
    const requestList = [getReasons(), getRegions(), getDepartments(), getAccidentTypes(), getAccidentLevels(), getDisciplineTree()]
    const [reasons, regions, departments, accidentTypes, accidentLevels, disciplineTree] = await Promise.all(requestList)
    console.log('🚀 ~ file: useInit.ts:15 ~ handleRequestBasicData ~ disciplineTree:', disciplineTree)
    // 设置原因
    setReasons(reasons.data || [])
    // 设置地区
    setRegions(regions.data || [])
    // 设置部门
    setDepartments(departments.data || [])
    // 设置事故类型
    setAccidentTypes(accidentTypes.data || [])
    // 设置事故级别
    setAccidentLevels(accidentLevels.data || [])
    // 设置作风纪律字典
    setDisciplineTree(disciplineTree.data || [])
  }

  return {
    handleRequestBasicData
  }
}

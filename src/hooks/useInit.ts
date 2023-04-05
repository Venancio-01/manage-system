import { useStore } from '@/store'
import { getReasons } from '@/api/outing/reason'
import { getRegions } from '@/api/misc/region'

export default () => {
  const store = useStore()
  const { setReasons, setRegions } = store

  const handleOnceRequest = async () => {
    const [reasons, regions] = await Promise.all([getReasons(), getRegions()])
    setReasons(reasons.data || [])
    setRegions(regions.data || [])
  }

  onMounted(() => {
    handleOnceRequest()
  })
}

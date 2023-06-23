import { resetPage } from "../redux/pageSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const IndexPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetPage())
  }, [dispatch])

  return (
    <div>Test</div>
  )
}

export default IndexPage
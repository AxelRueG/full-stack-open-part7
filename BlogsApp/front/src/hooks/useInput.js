import { useState } from 'react'

const useInput = (initial='') => {
  const [value, setValue] = useState(initial)

  const handleChange = (e) => setValue(e.target.value)
  const resetValue = () => setValue('')

  return {
    value,
    handleChange,
    resetValue
  }
}

export default useInput
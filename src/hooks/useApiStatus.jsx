import { useState } from 'react'

const useApiStatus = (inProgress = true) => {
  const [apiStatus, setApiStatus] = useState({
    inProgress: inProgress,
    failed: false,
    failMessage: '',
  })

  const changeApiStatus = (inProgress, failMessage) => {
    setApiStatus({
      inProgress,
      failed: !!failMessage,
      failMessage,
    })
  }

  const setInProgress = (inProgress = true) => {
    setApiStatus({
      ...apiStatus,
      inProgress,
    })
  }

  const setApiFailed = (failMessage) => {
    setApiStatus({
      ...apiStatus,
      inProgress: false,
      failed: !!failMessage,
      failMessage,
    })
  }

  const setApiSuccess = () => {
    setApiStatus({
      ...apiStatus,
      inProgress: false,
      failed: false,
      failMessage: '',
    })
  }

  return {
    apiStatus,
    setApiStatus,
    changeApiStatus,
    setInProgress,
    setApiFailed,
    setApiSuccess,
  }
}

export default useApiStatus
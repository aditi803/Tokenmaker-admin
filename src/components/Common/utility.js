import moment from 'moment'
import React from 'react'


export const fullDateFormat = (date) => {

  const month = moment(date).format('MMMM').toString()
  const splitMonth = month.slice(0, 3)
  return (
    <>
      {splitMonth}{" "}{moment(date).format("DD, YYYY")}

      <br />
      {/* <small>{moment(date).format('h:mm a')}</small> */}
    </>
  )
}

export const downloadFile = (dataurl, filename) => {
  try {
    console.log("download side ")
    const a = document.createElement('a')
    a.href = dataurl
    a.setAttribute('download', filename)
    a.click()
  } catch (error) {
    console.log(error, "download file side error")
  }


}


export const StandardPicketDateFormat = (Date) => {
  console.log(moment(Date).format(('h:mm a')), "hours")
  console.log(moment(Date).format("DD-MM-YYYY"), "total date")
  console.log(moment(Date).seconds, "seconds")




  return moment(Date).format('MM/DD/YYYY')

}
import React from 'react'

export const fullDateFormat = (date) => {
    return (
      <>
        {moment(date).format('MMMM DD, YYYY')}
        <br />
        <small>{moment(date).format('h:mm a')}</small>
      </>
    )
  }
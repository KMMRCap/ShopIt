import React from 'react'

const Loader = ({ small }) => {
  return (
    <div className={small ? 'small-loader' : 'loader'} />
  )
}

export default Loader
import React from 'react'
import styles from '../card/card.module.css'

const Card = ({title, content}) => {
  
  return (
    <div className={styles.card}>

      <h2 className=''>{title}</h2>
      <p className='mt-2'>{content}</p>

    </div>
  )
}

export default Card
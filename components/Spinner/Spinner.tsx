import { FC } from "react"
import styles from './Spinner.module.scss'
import classNames from 'classnames'

interface Spinner {
  size?: string
}

export const Spinner = ({ size }: Spinner) => (
  <div className={classNames(styles["spinner__spinner"], size && styles[`spinner__spinner--${size}`])}></div>
)

export default Spinner

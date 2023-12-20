import styles from './loading-dots.module.css'

type LoadingDotsProps = {
  color?: string
}

export default function LoadingDots({ color = '#000' }: LoadingDotsProps) {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  )
}

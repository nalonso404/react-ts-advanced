import styles from './page.module.css'
import { Tasks } from '@/components/Tasks'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hola Oriol! <br />
          Ets el millor!{' '}
        </h1>
        <Tasks />
      </main>
    </div>
  )
}

import styles from './header.module.css'

export const header: string = `
    <div class=${styles.header}>
        <h2 class=${styles.headerText}>PizarraJS</h2>
        <button class=${styles.headerButton}>
            <img class=${styles.questionMark}/>
        </button>
    </div>
`

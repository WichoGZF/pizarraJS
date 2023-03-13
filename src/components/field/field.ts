import styles from './field.module.css'

export const field: string = `
    <div class=${styles.field}>
        <div class=${styles.bar}>
            <div class=${styles.group}>
                <input type='checkbox' id='pencil' class=${styles.checkbox} ></input>
                <label htmlFor='pencil' class=${styles.pencilLabel}></label>
                <input type='checkbox' id='eraser' class=${styles.checkbox} ${styles.eraser}></input>
                <label htmlFor='eraser' class=${styles.eraserLabel}></label>
                <input type='color'></input>

            </div>
            <div class=${styles.group}>
                <button id="reset-red" class=${styles.reset} ${styles.red} onclick={handle}></button>
                <button id="hide-red" class=${styles.hide} ${styles.red}></button>
                <div class=${styles.divider}></div>
                <button id="reset-blue" class=${styles.reset} ${styles.blue}></button>
                <button id="hide-blue" class=${styles.hide} ${styles.blue}></button>
            </div>
        </div>
        <div id="field" class=${styles.playField}>
            <div id="select" class=${styles.selection}></div>
        </div>
    </div>
`

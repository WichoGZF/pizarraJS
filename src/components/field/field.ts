import styles from './field.module.css'

export const field: string = `
    <div class=${styles.field}>
        <div class=${styles.bar}>
            <div class=${styles.group}>
                <input type='checkbox' id='pencil' class="${styles.checkbox} ${styles.pencil}"></input>
                <input type='checkbox' id='eraser' class="${styles.checkbox} ${styles.eraser}"></input>
                <input type='color' id="color"></input>
                <button id="capture" class=${styles.capture}></button>
            </div>
            <div class=${styles.group}>
                    <button id="reset-red" class="${styles.reset} ${styles.red}"></button>
                    <button id="hide-red" class="${styles.hide} ${styles.red}"></button>
                <div class=${styles.divider}></div>
                    <button id="reset-blue" class="${styles.reset} ${styles.blue}"></button>
                    <button id="hide-blue" class="${styles.hide} ${styles.blue}"></button>
            </div>
        </div>
        <div id="field" class=${styles.playField}>
            <div id='ball' class=${styles.ball} draggable="true">
            </div>
            <canvas id="drawCanvas"></canvas>
            <div id="select" class=${styles.selection}></div>
        </div>
    </div>
`

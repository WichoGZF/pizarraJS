import styles from './dialog.module.css'

export const dialog: string = `
    <div class=${styles.background} id='dialog-faq'>
        <div class=${styles.dialog}>
            <div class=${styles.headerContainer}>
                <h3 class=${styles.header}> FAQ & How to </h3> 
                <button id="dialog-close" class=${styles.headerClose}></button>
            </div>
            <div class=${styles.bodyContainer}>
            <p> Pizarra JS is an app designed   to serve as a 'digital' magnetic board, commonly used 
            for sports in order to set up strategies, review scenarios, etc. </p>

            <p> It features DnD functionality, as well as multi selection. </p>
            <img class=${styles.dragGif} alt="video of draw operation"/>
            <p> You can use the Draw and Erase tools to illustrate ideas. </p>
            <img class=${styles.drawGif} alt="video of drawing operation"/>
            <p> With the Capture button you can capture the current field and save it to your computer. </p> 
            <img class=${styles.captureGif} alt="video of drawing operation"/>
            <p> Lastly the Reset and Hide buttons reset teams to their original positions and hide or show them accordingly.</p>
            <img class=${styles.hideResetGif} alt="video of drawing operation"/>
            </div>
        </div>
    </div>
`
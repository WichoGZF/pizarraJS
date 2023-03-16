import styles from './dialog.module.css'

export const dialog: string = `
    <div class=${styles.background} id='dialog-faq'>
        <div class=${styles.dialog}>
            <div class=${styles.headerContainer}>
                <h3 class=${styles.header}> FAQ & How to </h3> 
                <button id="dialog-close" class=${styles.headerClose}></button>
            </div>
            <p> Pizarra JS is an app designed   to serve as a 'digital' magnetic board, commonly used 
                for sports in order to set up strategies, review scenarios, etc. </p>

                <p> It features DnD functionality, as well as multi selection. </p>

                
                <p> You can use the Draw and Erase tools to illustrate ideas. </p>

                
                <p> With the Capture button you can capture the current field and save it to your computer. </p> 

                
                <p> Lastly the Reset and Hide buttons reset teams to their original positions and hide or show them accordingly.</p>

        </div>
    </div>
`
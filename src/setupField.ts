export function setupField(element: HTMLElement) {
    let showSelect: boolean = false; 
    let mouseIn: boolean = false; 

    element.addEventListener('mousedown')

    const setCounter = (count: number) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
  }
  
  
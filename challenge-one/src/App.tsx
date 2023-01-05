import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import { Circle } from './interfaces/Circles'
function App() {

  const [actualCircles, setActualCircles] = useState<Circle[]>([])
  const [undoCircles, setUndoCircles] = useState<Circle[]>([])

  const eventClickScreen = (e: React.MouseEvent) => {
    const newCircle = {
      id: uuidv4(),
      position_X: e.clientX, 
      position_Y: e.clientY
    }
    setActualCircles(prevState => [...prevState, newCircle])
  }

  const undoCircle = () => {
    const circleRemove = actualCircles[actualCircles.length - 1]
   
    if(actualCircles.length > 0){
      setActualCircles(prevStates => prevStates.filter((_, index) => {
        return Number(index) !== actualCircles.length - 1;
      }))
      if(undoCircles) {
        setUndoCircles(prevStates => [...prevStates, circleRemove])
      }else{
        setUndoCircles([circleRemove])
      }
    }
  }

  const redoCircle = () => {
    const circleRemoveUndo = undoCircles[undoCircles.length - 1]
    if(undoCircles && undoCircles.length > 0) {
      setUndoCircles(prevStates => prevStates.filter((_, index) => {
        return Number(index) !== undoCircles.length - 1;
    }))
    }else {
      return
    }
    setActualCircles(prevStates => [...prevStates, circleRemoveUndo])
  }

  return (
    <>
      <div className="App" onClick={(e) => eventClickScreen(e)}>
        {(actualCircles && actualCircles.length > 0) && (
          <div className='allCircles'>
            {actualCircles.map(circle => (
              <div style={{left: circle.position_X, top: circle.position_Y}} className='circle' key={circle.id}>
                
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='optionsButton'>
        <button onClick={undoCircle}>Undo</button>
        <button onClick={redoCircle}>Redo</button>
      </div>
    </>
  )
}

export default App
 
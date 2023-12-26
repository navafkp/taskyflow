import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import OneCard from './OneCard';

const Card = ({ task, index }) => {
    const [showModal, setShowModal] = useState(false)
    const colors = ['#78D1FF', '#FFD700', '#FF6347'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly choose a color from the array
    const style = {
        backgroundColor: `${randomColor}33`, // Adding alpha value for transparency
    };

    return (
        <div>
            {/* Creating Draggable cards */}
            <Draggable draggableId={`${task.id}`} key={task.id} index={index}>  
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {/* cards details here and more info modal when click the event */}
                        <div
                            onClick={() => setShowModal(true)} 
                            style={style}
                            className='h-32  uppercase rounded-xl px-4 py-7 text-sm m-3'>
                            <h3>{task.title}</h3>
                            {new Date(task.created_at).toLocaleDateString()}
                        </div>

                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
            {showModal && <OneCard task={task} closeModal={() => setShowModal(false)} />}
        </div>
    )
}
export default Card
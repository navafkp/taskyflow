import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'

const Columns = ({ title, tasks, id }) => {

    return (
        <div className='text-center font-bold bg-[#EEF2F5] w-full  rounded-xl m-3'>
            <p className='p-2  border-b border-[#9C528B] uppercase '>{title}</p>
            <Droppable droppableId={`${id}`}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {/* provided task here to columns */}
                        {tasks && tasks?.map((oneTask, index) => (
                            <Card key={index} task={oneTask} index={index} />
                        ))
                        }

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Columns
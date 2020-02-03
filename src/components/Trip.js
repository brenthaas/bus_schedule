import React from 'react'

const Trip = ({id, onClick, selected, startTime, duration}) => {
  if (id) {
    return (
      <div className={'trip' + (selected ? ' selected' : '')}
           key={'trip' + id}
           style={{ width: `${duration}px`, left: `${startTime}px` }}
           onClick={(event) => {
             onClick(id);
             event.stopPropagation();
           }}
      >
        {id}
      </div>
    )
  }

  return <div>Trip not Found!</div>;
};

export default Trip;

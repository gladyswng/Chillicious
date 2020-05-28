import React from 'react'

interface HeartedProps {

}

const Hearted: React.FC<HeartedProps> = (props) => {
    return (
      <ul>
        {props}
      </ul>
    )
}
export default Hearted
import React from 'react'

interface Props {
  text: string
}
const Title: React.FC<Props> = props => {
  const { text } = props;
  return (
    <div className="lee-title-wrapper">
      {text.split('').map(letter => (<span key={letter}>{letter}</span>))}
    </div >
  )
}

export default React.memo(Title);

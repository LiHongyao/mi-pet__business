import React, { memo } from 'react'
import './index.scss'

interface IProps {
  text: string,
  customCls?: string,
  backgroundColor?: string,
  round?: Boolean,
  onTap?: () => void
}
const Button: React.FC<IProps> = props => {
  const { 
    text,
    round,
    customCls,
    backgroundColor = '#F82F5C',
    onTap
  } = props;

  const _onTap = () => {
    onTap && onTap();
  }

  return (
    <div 
      className={`lg-button ${round ? 'round' : ''} ${customCls ? customCls : ''}`} 
      style={{backgroundColor}}
      onClick={_onTap}
    >
      {text}
    </div>
  )
}

export default memo(Button);
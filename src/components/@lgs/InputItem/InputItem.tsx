import React, { memo, useState, FormEvent} from 'react'
import './InputItem.scss';


interface IProps {
  value?: string,
  label?: string,
  placeHolder?: string,
  type?: string,
  maxLength?: number,
  clear?: boolean,
  rightButtonText?: string,
  border?: boolean,
  onChange?: (value: string) => void,
  onRigtButtonTap?: () => void
}
const InputItem: React.FC<IProps> = (props) => {
  const { label, placeHolder, maxLength, rightButtonText, value = '',  type = 'text', clear = true, border = true} = props;
  const { onChange, onRigtButtonTap } = props;

  const [val, setVal] = useState(value);


  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.persist();
    setVal(event.currentTarget.value);
    onChange && onChange(event.currentTarget.value);
  }

  return (
    <div className={`input__wrapper ${border && 'show-border'}`}>
      {/* 左边文字 */}
      {label && (
        <div className="input__label">{label.split('').map((text, index) => (
          <span key={index}>{text}</span>
        ))}</div>
      )}
      {/* 输入框 */}
      <input 
        className="input__control" 
        type={type} 
        value={val} 
        placeholder={placeHolder} 
        maxLength={maxLength} 
        onChange={onInputChange}
      />
      {/* 清除按钮 */}
      {clear && val.length > 0 &&  <img className="input__clear" src={require("./images/icon__clear.png")} onClick={ () => {setVal('')} } alt="" />}
      {/* 右侧内容 */}
      {rightButtonText && <section className="input__right_button" onClick={() => { onRigtButtonTap && onRigtButtonTap()}}>{rightButtonText}</section>}
    </div>
  )
}

export default memo(InputItem);

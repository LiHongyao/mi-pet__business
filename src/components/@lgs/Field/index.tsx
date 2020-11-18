import React, { memo, useState, FormEvent } from "react";
import './index.scss';

interface IProps {
  value?: string;
  placeHolder?: string;
  type?: string;
  clear?: boolean;
  backgroundColor?: string,
  round?: boolean,
  onChange?: (value: string) => void
}
const Field: React.FC<IProps> = (props) => {
  const { 
    value = '', 
    placeHolder, 
    type = "text", 
    backgroundColor = '#FFFFFF',
    clear = true,
    round = false
  } = props;
  const { onChange } = props;

  const [innerClear] = useState(clear);
  const [innerValue, setInnerValue] = useState(value);

  const _onChange = (event: FormEvent<HTMLInputElement>) => {
    event.persist();
    setInnerValue(event.currentTarget.value);
    onChange && onChange(event.currentTarget.value);
  }
  const _onClear = (event: FormEvent<HTMLElement>) => {
    console.log(event);
    setInnerValue('');
    onChange && onChange('');
  }
  const _onBlur = () => {
    // setInnerClear(false);
  }
  const _onFocus = () => {
    // setInnerClear(true);
  }
  return (
    <div className={`lg-field ${round ? 'round' : ''}`} style={{backgroundColor}}>
      <input 
        className="lg-field__control" 
        placeholder={placeHolder}
        type={type} 
        value={innerValue}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
      {innerClear && innerValue.length > 0 &&  <img className="lg-field__clear" src={require("./images/icon_clear.png")} onClick={ _onClear } alt="" />}
    </div>
  );
};

export default memo(Field);

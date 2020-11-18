import React, { memo } from 'react'
import { InputItem } from 'antd-mobile'
import JustifyView from '../../components/@lgs/JustifyView'
import './Specifications.scss'

export interface ISpec {
  item: string,
  wholesale_price: string,
  original_price: string,
  sale_price: string
}
export interface ISpecChange {
  index: number,
  key: keyof ISpec,
  value: string
}

export interface IProps {
  index: number,
  data: ISpec,
  onDelete: (index: number) => void,
  onChange: (obj: ISpecChange) => void
}

const Specifications: React.FC<IProps> = props => {
  const { index, data, onDelete, onChange } = props;
  return (
    <div className="specifications py-10 border-bottom">
      <section className="specifications-item d-flex align-items-center">
        <JustifyView text="规格名称" />
        <InputItem placeholder="请输入规格名称" defaultValue={data.item} onChange={(value) => { onChange({ index, key: 'item', value }) }} />
      </section>
      <section className="specifications-item d-flex align-items-center">
        <JustifyView text="批发价" />
        <InputItem placeholder="请输入批发价" defaultValue={data.wholesale_price} onChange={(value) => { onChange({ index, key: 'wholesale_price', value: value }) }} />
      </section>
      <section className="specifications-item d-flex align-items-center">
        <JustifyView text="零售价" />
        <InputItem placeholder="请输入零售价" defaultValue={data.original_price} onChange={(value) => { onChange({ index, key: 'original_price', value: value }) }} />
      </section>
      <div className="f13 color-FF2121 lh-28 text-right" >
        <span onClick={() => { onDelete(index) }}>删除规格</span>
      </div>
    </div>
  )
}

export default memo(Specifications);


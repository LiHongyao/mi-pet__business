import React, { useCallback, useState } from 'react';
import { ImagePicker, List, Picker, InputItem } from 'antd-mobile'
import { useTitle } from '../../hooks'

import Title from './Title'

import './index.scss'
const Item = List.Item;


// 分类
const categories = [
  { label: '宠粮', value: '宠粮' },
  { label: '零食', value: '零食' },
  { label: '用品', value: '用品' },
  { label: '保健', value: '保健' }
]
// 品种
const varieties = [
  { label: '狗狗', value: '狗狗' },
  { label: '猫猫', value: '猫猫' },
]
// 阶段
const dogStages = [
  { label: '幼犬', value: '幼犬' },
  { label: '中型犬', value: '中型犬' },
  { label: '成犬', value: '成犬' },
  { label: '全阶段', value: '全阶段' }
]
// const catStages = [
//   { label: '幼猫', value: '幼猫' },
//   { label: '中型猫', value: '中型猫' },
//   { label: '成猫', value: '成猫' },
//   { label: '全阶段猫', value: '全阶段猫' }
// ] 


const UploadGoods: React.FC = () => {
  // state
  const [goodsFiles, setGoodsFiles] = useState([]);
  const [detailFiles, setDetailFiles] = useState([]);

  // events
  const onGoodsImagesChange = useCallback(files => {
    setGoodsFiles(files);
  }, [])
  const onDetailImagesChange = useCallback(files => {
    setDetailFiles(files);
  }, [])
  // hooks
  useTitle('上传商品'); 
  // effects


  return (
    <div className="page upload-goods pt-16 px-10">
      <div className="wrapper mx-auto px-12 bg-FFFFFF rounded-12">
        <List>
          {/* 商品名称 */}
          <Item>
            <Title text="商品名称" />
            <InputItem placeholder="请输入商品名称" />
          </Item>
          {/* 品牌 */}
          <Item>
            <Title text="品牌" />
            <InputItem placeholder="请输入商品名称" />
          </Item>
          {/* 商品分类 */}
          <Picker
            data={categories}
            value={[0]}
            cols={1}
          >
            <Item arrow="horizontal" extra="hahah">
              <Title text="分类" />
              <p className="value">12321321</p>
            </Item>
          </Picker>
          {/* 品种 */}
          <Picker
            data={varieties}
            value={[0]}
            cols={1}
          >
            <Item arrow="horizontal">
              <Title text="品种" />
              <p className="value">12321321</p>
            </Item>
          </Picker>
          {/* 阶段 */}
          <Picker
            data={dogStages}
            value={[0]}
            cols={1}
          >
            <Item arrow="horizontal" extra="1">
              <Title text="阶段" />
              <p className="value">12321321</p>
            </Item>
          </Picker>
        </List>
      </div>

      {/* 商品主图 */}
      <div className="mt-10 pt-16 pb-18 px-12 bg-FFFFFF rounded-12">
        <h1 className="f14 my-0 color-272727 mb-11">商品主图</h1>
        <ImagePicker
          className="details-image-picker"
          files={goodsFiles}
          length="4"
          multiple={true}
          onChange={onGoodsImagesChange}
        />
      </div>
      {/* 详情图片 */}
      <div className="mt-10 pt-16 pb-18 px-12 bg-FFFFFF rounded-12">
        <h1 className="f14 my-0 color-272727 mb-11">详情图片</h1>
        <ImagePicker
          className="details-image-picker"
          files={detailFiles}
          length="4"
          multiple={true}
          onChange={onDetailImagesChange}
        />
      </div>
      {/* 发布按钮 */}
      <div className="publish-button color-FFFFFF bg-F82F5C flex-center mx-auto f15 rounded-22 mt-24 mb-39">立即发布</div>
    </div>
  );
}

export default UploadGoods;

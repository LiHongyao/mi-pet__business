
import React, { useCallback, useState, useEffect } from 'react';
import { ImagePicker, List, Picker, InputItem, Toast } from 'antd-mobile'
import Api from '../../api'
import { useTitle } from '../../hooks'
import LgNumber from '../../utils/lg-number'
import JustifyView from '../../components/@lgs/JustifyView/index'
import Specifications, { ISpec, ISpecChange} from './Specifications'

import './index.scss'
import { useHistory } from 'react-router';

const Item = List.Item;



// 分类
const DATA_CATEGORIES = [
  { label: '主粮', value: 1 },
  { label: '零食', value: 2 },
  { label: '用品', value: 3 },
  { label: '保健', value: 4 }
]
// 品种
const DATA_VARIETIES = [
  { label: '猫猫', value: 1 },
  { label: '狗狗', value: 2 },
  { label: '通用', value: 3 },
]
// 保质期
const DATA_EXP = (() => {
  let arr = [];
  for (let i = 1; i <= 36; i++) {
    arr.push({ label: `${i}个月`, value: i })
  }
  return arr;
})();

let added = false;
// 规格数据
let specs: Array<ISpec> = [] as Array<ISpec>;
const UploadGoods: React.FC = () => {

  const history = useHistory();
  // state
  const [loading, setLoading] = useState(false);
  const [goodsFiles, setGoodsFiles] = useState([]);
  const [detailFiles, setDetailFiles] = useState([]);
  // 商品相关
  const [goodsName, setGoodsName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCatrgory] = useState(0);
  const [varieties, setVarieties] = useState(0);
  const [exp, setExp] = useState(0);
  const [specsCount, setSpecsCount] = useState<number>(0);
  const [cmps, setCmps] = useState<JSX.Element[]>();
  // events
  const onGoodsImagesChange = useCallback(files => {
    setGoodsFiles(files);
  }, [])
  const onDetailImagesChange = useCallback(files => {
    setDetailFiles(files);
  }, [])
  // hooks
  useTitle('上传商品');
  // methods
  const check = () => {
    return new Promise((resolve) => {
      if(loading) return;
      let title = '';
      switch (true) {
        case !goodsName:
          title = '商品名称不能为空';
          break;
        case !brand:
          title = '品牌名称不能为空';
          break;
        case !category:
          title = '请选择商品分类';
          break;
        case !varieties:
          title = '请选择使用品种';
          break;
        case !exp:
          title = '请选择保质期';
          break;
        case specs.length === 0 || !specs[0].item || !specs[0].wholesale_price || !specs[0].original_price:
          title = '请至少填入一种规格';
          break;
        case goodsFiles.length < 1:
          title = "请至少上传一张主图";
          break;
        case detailFiles.length < 2:
          title = "请至少上传两张详情图";
      }
      // 遍历判断规格是否是数字
      for(let i = 0; i < specs.length; i++) {
        const spec = specs[i];
        const reg = new RegExp('^\\d+$')
        if(!reg.test(spec.original_price) || !reg.test(spec.wholesale_price)) {
          debugger
          title = '批发价或者售价必须是数字';
          break;
        }
      }
      if(title) {
        Toast.info(title)
      }else {
        resolve();
      }
    })
  }
  // events
  const onAddSpec = () => {
    setSpecsCount(prevState => prevState + 1)
    specs.push({
      item: '',
      wholesale_price: '',
      original_price: '',
      sale_price: ''
    })
  }
  const onDelete = useCallback((index: number) => {
    setSpecsCount(prevState => prevState - 1);
    specs.splice(index, 1);
  }, []);
  const onChange = useCallback((obj:ISpecChange) => {
    const { index, key, value } = obj;
    specs[index][key] = value;
  }, []);
  const onPublish = () => {
    if(added) {
      Toast.info('请勿重复上传！');
      return;
    }
    check().then(() => {
      setLoading(true);
      // 处理规格/计算售价/默认9折
      const items: ISpec[] = specs.map((item: ISpec) => {
        return {
          ...item,
          sale_price: LgNumber.multiply(Number(item.original_price), 0.9).toString()
        }
      });
      // 处理banners
      let banners = goodsFiles.map((item: { url: string }) => {
        return item.url;
      });
      let infos = detailFiles.map((item: { url: string }) => {
        return item.url;
      });
      // 上传图片
      Api.file.upload({
        images: banners,
        type: 'goods_banners'
      }).then(res => {
        banners = res.data;
        Api.file.upload({
          images: infos,
          type: 'goods_details'
        }).then(res => {
          infos = res.data;
          Api.goods.add({
            banners,
            infos,
            items,
            title: goodsName,
            brand: brand,
            type_id: category,
            label_id: varieties,
            expiration_date: exp
          }).then(() => {
            specs = [] as Array<ISpec>;
            Toast.info('新增商品成功！', 1, () => {
              history.goBack();
            })
          
          })
        })
      })
    })
  }



  // effects

  useEffect(() => {
    let specCmp = [];
    for (let i = 0; i < specsCount; i++) {
      specCmp.push(<Specifications index={i} data={specs[i]} key={Math.random()} onDelete={onDelete} onChange={onChange} />)
    }
    setCmps(specCmp);
  }, [specsCount, onDelete, onChange])
  return (
    <div className="page upload-goods pt-16 px-10">
      {/* 商品信息 */}
      <div className="pt-16 px-12 bg-FFFFFF rounded-12">
        <h1 className="f14 my-0 color-272727 mb-11">商品信息</h1>
        <List>
          {/* 商品名称 */}
          <Item>
            <JustifyView text="商品名称" />
            <InputItem placeholder="请输入商品名称" clear onChange={(value: string) => setGoodsName(value)} />
          </Item>
          {/* 品牌 */}
          <Item>
            <JustifyView text="品牌" />
            <InputItem placeholder="请输入品牌名称" clear onChange={(value: string) => setBrand(value)} />
          </Item>
          {/* 分类 */}
          <Picker
            data={DATA_CATEGORIES}
            value={[category]}
            cols={1}
            extra="请选择"
            onChange={(value: Array<number>) => setCatrgory(value[0])}
          >
            <List.Item arrow="horizontal">
              <JustifyView text="分类" />
            </List.Item>
          </Picker>
          {/* 品种 */}
          <Picker
            data={DATA_VARIETIES}
            value={[varieties]}
            cols={1}
            extra="请选择"
            // @ts-ignore
            onChange={(value: Array<number>) => setVarieties(value[0])}
          >
            <List.Item arrow="horizontal">
              <JustifyView text="品种" />
            </List.Item>
          </Picker>
          {/* 保质期 */}
          <Picker
            data={DATA_EXP}
            value={[exp]}
            cols={1}
            extra="请选择"
            // @ts-ignore
            onChange={(value: Array<number>) => setExp(value[0])}
          >
            <List.Item arrow="horizontal">
              <JustifyView text="保质期" />
            </List.Item>
          </Picker>
        </List>
      </div>
      {/* 规格信息 */}
      <div className="mt-10 pt-16 pb-18 px-12 bg-FFFFFF rounded-12">
        <h1 className="f14 my-0 color-272727 mb-11">规格信息</h1>
        {cmps?.map(item => item)}
        <section className="add-spec flex-center f13 border rounded-22 mx-auto mt-10 color-272727" onClick={onAddSpec}>添加规格</section>
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
      <div className="publish-button color-FFFFFF bg-F82F5C flex-center mx-auto f15 rounded-22 mt-24 mb-39" onClick={onPublish}>立即发布</div>
    </div>
  );
}

export default UploadGoods;

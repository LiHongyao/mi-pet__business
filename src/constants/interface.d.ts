
export = SPMS;
export as namespace SPMS;

declare namespace SPMS {

  interface ISpec {
    goods_id: number,
    specId: number,
    title: string,
    WholesalePrice: string,
    originPrice: string,
    salePrice: string,
    sort: number
  }


  interface IGoodsItem {
    goodsId: number,
    status: number,
    orderId: number,
    thumbnail: string,
    title: string,
    originPrice: string,
    num: number,
    spaceName: string
  }

  interface IGoodsDetails extends IGoodsItem {
    images: string[],
    infos: string[],
    brand: string,
    category: string,
    breed: string,
    expires: number,
    specifications: ISpec[],
    [propName: string]: any
  }


  interface IAddress {
    name: string;
    phone: string;
    address: string;
    doorplate: string;
    addrId: number
  }

  interface ILogistic {
    time: string,
    status: string
  }
  interface ILogistics {
    list: ILogistic[]
  }

  interface IRefund {
    reason: string,
    refundTime: number,
    status: number
  }




  //////////////////////////////////////
  /// 请求相关
  //////////////////////////////////////

}




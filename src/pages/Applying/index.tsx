import React from 'react'

import { useTitle } from '../../hooks'

const Applying: React.FC = () => {
  useTitle('i觅宠 - 商家管理后台')
  return (
    <div className="page text-center pt-99">
      <p className="color-828282 f16 mb-12">i觅宠提示您</p>
      <p className="color-6495ED f18 f-bold">商家审核中，耐心等待...</p>
    </div>
  )
}

export default Applying;
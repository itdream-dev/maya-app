import React from 'react';
import { CustomBtn } from '../Custom/CustomBtn';
import { CustomCoinItem } from '../Custom/CustomCoinItem';


export const CustomCollateralEnabledModal = () => {
  return (
    <div style={{ padding: 20, background: '#fff' }}>

      <p style={{ marginTop: 30, fontSize: 14, color: '#000', textAlign: 'center', fontWeight: 'bold' }}>Enable as Collateral </p>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#aab8c1' }}>
        Each asset used as collateral increases your borrowing limit.
        Be careful, this can subject the asset to being seized in liquidation. 
        <span style={{ color: '#13D69D'}}> Learn more.</span>
      </p>

      <CustomCoinItem title={'Borrow Limit'} values={['$125.80', '$125.80']} />
      <CustomCoinItem title={'Borrow Limit Used'} values={['0%', '0%']} />
      <CustomBtn title={'USE DAI AS COLLATERAL'} color={'#9669ED'} />

    </div>
  )
}

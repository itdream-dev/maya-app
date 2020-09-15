import React from 'react';
import { CustomBtn } from '../Custom/CustomBtn';
import { CustomCoinItem } from '../Custom/CustomCoinItem';


export const CustomCollateralRequiredModal = () => {
  return (
    <div style={{ padding: 20, background: '#fff' }}>

      <p style={{ marginTop: 30, fontSize: 14, color: '#000', textAlign: 'center', fontWeight: 'bold' }}>Collateral Required </p>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#aab8c1' }}>
        This asset is required to support your borrowed assets.
        Either repay borrowed assets, or supply another asset as collateral.
      </p>

      <CustomCoinItem title={'Borrow Limit'} values={['$125.80', '$0']} />
      <CustomCoinItem title={'Borrow Limit Used'} values={['0%', 'Liquidation']} border={'red'} />
      <CustomBtn title={'DISMISS'} color={'#9669ED'} />

    </div>
  )
}

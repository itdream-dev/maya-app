import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomBtn } from '../Custom/CustomBtn';
import { CustomCoinItem } from '../Custom/CustomCoinItem';
import { CustomTab } from '../Custom/CustomTab';

const InputSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  height: 140px;

  input {
    flex: 1;
    width: 70%;
    border: none;
    background: transparent;
    text-align: center;
    font-size: 24px;
  }
  input:focus, textarea:focus, select:focus{
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
  p {
    margin: 0 20px 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: #aab8c1;
    position: absolute;
    right: 20;
  }
`

export const CustomBorrowModal = (props: any) => {
  const [selected, setSelected] = useState(true);
  return (
    <div>
      <InputSection>
        <div style={{ width: '80%' }}>
          <input type="number" name="tentacles" placeholder="0" />
        </div>
        <p>{selected ? 'MAX' : 'SAFE MAX'}</p>
      </InputSection>
      <CustomTab selected={selected} tabClick={(x: boolean) => setSelected(x)} title1={'BORROW'} title2={'REPAY'} />
      <div style={{ padding: 20, background: '#fff' }}>
        {selected && <div>
          <div style={{ fontSize: 12 }}>Borrow Rates </div>
          <CustomCoinItem logo={'assets/asset_USDC.svg'} title={'Borrow APY'} value={'2.02%'} />
          <CustomCoinItem logo={'assets/asset_COMP.svg'} title={'Distribution APY'} value={'- %'} border={'transparent'} />
          <div style={{ marginTop: 30, fontSize: 12 }}>Borrow Limit </div>
          <CustomCoinItem title={'Borrow Balance'} value={'$0.00'} />
          <CustomCoinItem title={'Borrow Limit Used'} value={'0.00%'} />
          <CustomBtn color={'#00D395'} title={'SUPPLY'} />
          <CustomCoinItem title={'Protocol Balance'} value={'0 USDC'} border={'transparent'} />
        </div>}

        {!selected && <div>
          <div style={{ fontSize: 12 }}>Borrow Rates </div>
          <CustomCoinItem logo={'assets/asset_ETH.svg'} title={'Supply APY'} value={'7.86%'} />
          <CustomCoinItem logo={'assets/asset_COMP.svg'} title={'Distribution APY'} value={'- %'} border={'transparent'} />
          <div style={{ marginTop: 30, fontSize: 12 }}>Borrow Limit </div>
          <CustomCoinItem title={'Borrow Balance'} value={'$0.00'} />
          <CustomCoinItem title={'Borrow Limit Used'} value={'0.00%'} />
          <CustomBtn color={'#CCd6DD'} title={'NO FUNDS AVAILABLE'} />
          <CustomCoinItem title={'Protocol Balance'} value={'0.4271 ETH'} border={'transparent'} />
        </div>}

      </div>

    </div>
  )
}

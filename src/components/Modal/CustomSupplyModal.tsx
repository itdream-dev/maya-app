import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomCoinItem } from '../Custom/CustomCoinItem';

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

const TAB = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  color: ${({ selected }) => (selected ? '#00D395' : 'grey')};
  border-bottom: 3px solid ${({ selected }) => (selected ? '#00D395' : 'transparent')};
  font-size: 12px;
  font-weight: 500;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer
  }
`

const Button = styled.div<{ enabled: boolean }>`
  background: ${({ enabled }) => (enabled ? '#00D395' : '#CCd6DD')};
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  margin-top: 20px;
  &:hover {
    cursor: pointer
  }
`
export const CustomSupplyModal = (props: any) => {
  const [selected, setSelected] = useState(true);
  return (
    <div>
      <InputSection>
        <div style={{ width: '80%'}}>
          <input type="number" name="tentacles" placeholder="0" />
        </div>
        <p>{selected? 'MAX': 'SAFE MAX'}</p>
      </InputSection>
      <div style={{ display: 'flex' }}>
        <TAB selected={selected} onClick={() => setSelected(true)}>SUPPLY</TAB>
        <TAB selected={!selected} onClick={() => setSelected(false)}>WITHDRAW</TAB>
      </div>
      <div style={{ padding: 20, background: '#fff'}}>
        {selected && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={'assets/asset_ETH.svg'} title={'Supply APY'} value={'7.86%'}/>
          <CustomCoinItem logo={'assets/asset_COMP.svg'} title={'Distribution APY'} value={'- %'} border={'none'}/>
          <div style={{ marginTop: 30, fontSize: 12 }}>Borrow Limit </div>
          <CustomCoinItem title={'Borrow Balance'} value={'$0.00'}/>
          <CustomCoinItem title={'Borrow Limit Used'} value={'0.00%'}/>
          <Button enabled={true}>SUPPLY</Button>
          <CustomCoinItem title={'Protocol Balance'} value={'0.4271 ETH'} border={'none'}/>
        </div>}

        {!selected && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={'assets/asset_ETH.svg'} title={'Supply APY'} value={'7.86%'}/>
          <CustomCoinItem logo={'assets/asset_COMP.svg'} title={'Distribution APY'} value={'- %'} border={'none'}/>
          <div style={{ marginTop: 30, fontSize: 12 }}>Borrow Limit </div>
          <CustomCoinItem title={'Borrow Limit'} values={['$125.80', '$479.24']}/>
          <CustomCoinItem title={'Borrow Limit Used'} values={['0.00%', '0.00%']}/>
          <Button enabled={false}>WITHDRAW</Button>
          <CustomCoinItem title={'Protocol Balance'} value={'0.4271 ETH'} border={'none'}/>
        </div>}

      </div>

    </div>
  )
}

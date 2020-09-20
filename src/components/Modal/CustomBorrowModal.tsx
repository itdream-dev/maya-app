import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { CustomBtn } from '../Custom/CustomBtn';
import { CustomCoinItem } from '../Custom/CustomCoinItem';
import { CustomTab } from '../Custom/CustomTab';
import tokenInfo from '../../constants/tokenlist.json'
import { useTokenGetAllowance } from '../../state/compound/hooks'

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
 
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem;
  font-weight: 500;
  text-align: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
`

export const CustomBorrowModal = (props: any) => {
  const [selected, setSelected] = useState(true);
  const [amount, setAmount] = useState<string>('')  

  var token = tokenInfo.tokens[0];
  for (let i = 0; i < tokenInfo.tokens.length; i++){
    if (tokenInfo.tokens[i].address === props.selected_token_address)
      token = tokenInfo.tokens[i];
  }

 
  const approved_amount = useTokenGetAllowance(token)[0];
  var is_approved = approved_amount.greaterThan('0');
  console.log('approved', approved_amount.toSignificant(4));

  const handleInput =  useCallback(event => {
    const input = event.target.value
    setAmount(input)    
  }, [])

  return (
    <div>
      <HeaderRow>
              <img src={token.logoURI} alt='token log'></img>
              {token.symbol}
      </HeaderRow>, 

      {selected && is_approved && <InputSection>
        <div style={{ width: '80%'}}>
          <input type="number" name="tentacles" placeholder="0" value={amount} onChange={handleInput}/>
        </div>
        <p>{selected? 'MAX': 'SAFE MAX'}</p>
      </InputSection>}

      {selected && !is_approved && <InputSection>
        <div style={{ width: '80%'}}>
          <input type="number" name="tentacles" placeholder="0" value={amount} onChange={handleInput}/>
        </div>
        <p>{selected? 'MAX': 'SAFE MAX'}</p>
      </InputSection>}

      {!selected && is_approved && <InputSection>
        <div style={{ width: '80%'}}>
          <input type="number" name="tentacles" placeholder="0" />
        </div>
        <p>{selected? 'MAX': 'SAFE MAX'}</p>
      </InputSection>}


      {!selected && !is_approved && <InputSection>
        <div style={{ width: '100%', textAlign:'center', padding:'10px 20px'}}>
          To Supply or Repay {token.symbol} to the Maya Protocol,<br/> you need to enable it first.
        </div>        
      </InputSection>}

      <CustomTab selected={selected} tabClick={(x: boolean) => setSelected(x)} title1={'BORROW'} title2={'REPAY'} />
      <div style={{ padding: 20, background: '#fff' }}>
        {selected && <div>
          <div style={{ fontSize: 12 }}>Borrow Rates </div>
          <CustomCoinItem logo={'assets/asset_USDC.svg'} title={'Borrow APY'} value={'2.02%'} />          
          <CustomBtn color={'#00D395'} title={'Borrow'} />
          <CustomCoinItem title={'Protocol Balance'} value={'0 USDC'} border={'transparent'} />
        </div>}

        {!selected && <div>
          <div style={{ fontSize: 12 }}>Borrow Rates </div>
          <CustomCoinItem logo={'assets/asset_ETH.svg'} title={'Supply APY'} value={'7.86%'} />          
          <CustomBtn color={'#CCd6DD'} title={'NO FUNDS AVAILABLE'} />
          <CustomCoinItem title={'Protocol Balance'} value={'0.4271 ETH'} border={'transparent'} />
        </div>}

      </div>

    </div>
  )
}

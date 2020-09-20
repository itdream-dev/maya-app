import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { CustomBtn } from '../Custom/CustomBtn';
import { CustomCoinItem } from '../Custom/CustomCoinItem';
import { CustomTab } from '../Custom/CustomTab';
import { useTokenGetAllowance, ApprovalState, useApproveCallback, useSupplyCallBack, useWithdrawCallBack } from '../../state/compound/hooks'
import tokenInfo from '../../constants/tokenlist.json'
import { useETHBalances } from '../../state/compound/hooks'
import { useActiveWeb3React } from '../../hooks'
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


export const CustomSupplyModal = (props: any) => {
  const [selected, setSelected] = useState(true);
  const [amount, setAmount] = useState<string>('')
  const { account } = useActiveWeb3React()  
  console.log(props.selected_token_address, props.selected_ctoken_address);
  var token = tokenInfo.tokens[0];
  for (let i = 0; i < tokenInfo.tokens.length; i++){
    if (tokenInfo.tokens[i].address === props.selected_token_address)
      token = tokenInfo.tokens[i];
  }

 
  const approved_amount = useTokenGetAllowance(token)[0];
  var is_approved = approved_amount.greaterThan('0');
  console.log('approved', approved_amount.toSignificant(4));
  

  const protocal_balance = props.underlying_balances[props.selected_ctoken_address];

  var wallet_balance = props.token_balances[props.selected_token_address];
  const eth_balance = useETHBalances(account ? [account] : [])?.[account ?? '']
  if (token.symbol === 'ETH'){
    wallet_balance = eth_balance;
    is_approved = true;
    console.log('wallet_balance', wallet_balance)
  }

  const have_wallet_balance = wallet_balance?wallet_balance.greaterThan('0') : 0;
  const have_protocal_balance = protocal_balance?protocal_balance.greaterThan('0') : 0;
  console.log('have_wallet_balance', have_wallet_balance)
  const [approvalA, approveACallback] = useApproveCallback(token, props.selected_ctoken_address)
  const [supplyCallBack] = useSupplyCallBack(token,  amount);
  const [withdrawCallBack] = useWithdrawCallBack(token,  amount);
  //const [approvalA, approveACallback] = supply(token, props.selected_ctoken_address)
  
  if (approvalA !== ApprovalState.APPROVED){
    console.log('approved');
  }

  const EnableToken = () => approveACallback();

  const SupplyToken = () =>  supplyCallBack();

  const WithdrawToken = () => withdrawCallBack(); 

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

      {!selected && is_approved && <InputSection>
        <div style={{ width: '80%'}}>
          <input type="number" name="tentacles" placeholder="0" />
        </div>
        <p>{selected? 'MAX': 'SAFE MAX'}</p>
      </InputSection>}

      {selected && !is_approved && <InputSection>
        <div style={{ width: '100%', textAlign:'center', padding:'10px 20px'}}>
          To Supply or Repay {token.symbol} to the Maya Protocol,<br/> you need to enable it first.
        </div>        
      </InputSection>}

      {!selected && !is_approved && <InputSection>
        <div style={{ width: '100%', textAlign:'center', padding:'10px 20px'}}>
          To Supply or Repay {token.symbol} to the Maya Protocol,<br/> you need to enable it first.
        </div>        
      </InputSection>}

      <CustomTab selected={selected} tabClick={(x: boolean) => setSelected(x)} title1={'SUPPLY'} title2={'WITHDRAW'} />
      <div style={{ padding: 20, background: '#fff'}}>
        {/*--- supply ---*/}
        {/*-- enabled ----*/} {/*-- no funds ----*/}
        
        {selected && is_approved && !have_wallet_balance && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={props.supplyapys[props.selected_ctoken_address]}/>                    
          <CustomBtn color={'#CCD6DD'} title={'NO BALANCE TO SUPPLY'}/>
          <CustomCoinItem title={'Wallet Balance'} value={wallet_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>
        </div>}
        
        {/*-- enabled ----*/} {/*-- available funds ----*/}
        {selected && is_approved && have_wallet_balance && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={props.supplyapys[props.selected_ctoken_address] + '%'}/>          
          <CustomBtn color={'#00D395'} title={'Supply'} buttonClick={() => SupplyToken()}/>
          <CustomCoinItem title={'Wallet Balance'} value={wallet_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>          
        </div>}

        {/*-- disabled ----*/} 
                
        {selected && !is_approved && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={props.supplyapys[props.selected_ctoken_address] + '%'}/>          
          <CustomBtn color={'#00D395'} title={'Enable'} buttonClick={() => EnableToken()}/>
          <CustomCoinItem title={'Wallet Balance'} value={wallet_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>          
        </div>}

        {/*--- widthdraw ---*/}
        {/*-- enabled ----*/}
        {!selected && is_approved && !have_protocal_balance && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={'7.86%'}/>          
          <CustomBtn color={'#CCd6DD'} title={'NO BALANCE TO WITHDRAW'}/>
          <CustomCoinItem title={'Protocol Balance'} value={protocal_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>
        </div>}

        {!selected && is_approved && have_protocal_balance && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={'7.86%'}/>          
          <CustomBtn color={'#00D395'} title={'WITHDRAW'} buttonClick={() => WithdrawToken()}/>
          <CustomCoinItem title={'Protocol Balance'} value={protocal_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>
        </div>}

        {/*-- disabled ----*/} 
        {!selected && !is_approved && <div>
          <div style={{ fontSize: 12 }}>Supply Rates </div>
          <CustomCoinItem logo={token.logoURI} title={'Supply APY'} value={'7.86%'}/>          
          <CustomBtn color={'#00D395'} title={'Enable'}/>
          <CustomCoinItem title={'Protocol Balance'} value={protocal_balance?.toSignificant(4) + ' ' + token.symbol} border={'transparent'}/>
        </div>}

      </div>
    </div>
  )
}

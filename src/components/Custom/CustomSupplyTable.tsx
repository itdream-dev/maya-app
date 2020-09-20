import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from "react-switch";
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/compound/hooks'
//import { BigNumber } from '@ethersproject/bignumber'
const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
const TR = styled.tr`
  border: 1px solid #dddddd;
  padding: 8px;
`
const TR2 = styled.tr`
  border: 1px solid #dddddd;
  padding: 8px;
  &:hover {
    cursor: pointer;
    border: 2px solid #00D395;
  }
`
const TH = styled.th`
  border: 1px solid #dddddd;
  text-align: right;
  padding: 14px 8px;
  font-size: 14px;
  color: #aab8c1;
  font-weight: 600;
`
const TD = styled.td`
  border: 1px solid #dddddd;
  text-align: right;
  padding: 0 8px;
  margin: 0;
  height: 70px;
  img {
    width: 40px;
    height: 40px;
  }
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
    }
  }
`

const Mark = styled.div`
  margin: 18px 7px;
  font-size: 15px;
  color: #aab8c1;
  font-weight: 600;
  span {
    color: #aab8c1;
    font-size: 12px;
    margin-left: 4px;
    &:hover {
      cursor: pointer;
    }
  }
`
 
export const CustomSupplyTable = (props: any) => {
  const [expand, setExpand] = useState(true);
  const { chainId, account } = useActiveWeb3React()  
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  console.log('customTable', props.underlying_balances)
  console.log('customTable', props.borrowBalances)
  return (
    <div>
      <Table>
        <tbody>
          <TR>
            {props.cols1.map((item: any, index: number) => <TH key={index} style={item.style}>{item.title}</TH>)}
          </TR>
          {props.data.map((item: any, index: number) =>
          item.chainId === chainId && props.underlying_balances && Object.keys(props.underlying_balances).length > 0 && props.underlying_balances[item.ctoken_address].greaterThan('0')  && <TR key={index}  onClick={() => props.onClickItem(item)}>
            <TD style={{ textAlign: 'left', paddingLeft: 18 }}>
              <div>
                <img src={item.ctoken_name_logURI} alt={'asset'} />
                <span>{item.symbol}</span>
              </div>
            </TD>
            <TD>
              <p>{Object.keys(props.supplyapys).length > 0 ? props.supplyapys[item.ctoken_address] : 0}% </p>              
            </TD>
            <TD>              
              <p style={{ color: '#AAB8C1', fontWeight: 600}}>{props.underlying_balances[item.ctoken_address]?.toSignificant(6)} {props.unit}</p>
            </TD>
            <TD>
              <Switch onColor={'#00D395'} onChange={() => props.modalCollaterial(props.collateral_enables[item.ctoken_address])} checked={props.collateral_enables[item.ctoken_address]} width={36} height={18} />                  
            </TD>
          </TR>
          )}
        </tbody>
      </Table>

      <Mark>
        All Marks <span onClick={() => setExpand(!expand)}>{expand ? '▲' : '▼'}</span>
      </Mark>

      {
        expand && <Table>
          <tbody>
            <TR>
              {props.cols2.map((item: any, index: number) => <TH key={index} style={item.style}>{item.title}</TH>)}
            </TR>
            {props.data.map((item: any, index: number) =>
              item.chainId === chainId && props.underlying_balances && Object.keys(props.underlying_balances).length > 0 && !props.underlying_balances[item.ctoken_address].greaterThan('0') && <TR2 key={index}  onClick={() => props.onClickItem(item)}>
                <TD style={{ textAlign: 'left', paddingLeft: 18 }}>
                  <div>
                    <img src={item.logoURI} alt={'asset'} />
                    <span>{item.symbol}</span>
                  </div>
                </TD>
                <TD>                        
                  <p>{Object.keys(props.supplyapys).length > 0 ? props.supplyapys[item.ctoken_address] : 0}% </p>
                </TD>
                <TD>
                  {item.symbol === 'ETH' && <p>{userEthBalance?.toSignificant(4) + ' ' + item.symbol}</p>}
                  {item.symbol !== 'ETH' && <p>{props.token_balances[item.address]?.toSignificant(4) + ' ' + item.symbol}</p>}
                </TD>
                <TD>
                  <Switch onColor={'#00D395'} onChange={() => props.modalCollaterial(props.collateral_enables[item.ctoken_address])} checked={props.collateral_enables[item.ctoken_address]} width={36} height={18} />                  
                </TD>
              </TR2>
            )}
          </tbody>
        </Table>
      }
    </div>
  )
}

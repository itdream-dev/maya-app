import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from "react-switch";

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
const Chart = styled.div`
  width: 40px;
  height: 6px;
  border-radius: 12px;
  background: lightgrey;
`
export const CustomTable = (props: any) => {
  const [expand, setExpand] = useState(true);
  return (
    <div>
      <Table>
        <tbody>
          <TR>
            {props.cols1.map((item: any, index: number) => <TH key={index} style={item.style}>{item.title}</TH>)}
          </TR>
          <TR>
            <TD style={{ textAlign: 'left', paddingLeft: 18 }}>
              <div>
                <img src={'assets/' + props.header_img} alt={'asset'} />
                <span>{props.header_title}</span>
              </div>
            </TD>
            <TD>
              <p>7.86%</p>
              <p style={{ color: '#AAB8C1', fontWeight: 600, marginTop: -10 }}>0.0027 {props.unit}</p>
            </TD>
            <TD>
              <p>$167.73</p>
              <p style={{ color: '#AAB8C1', fontWeight: 600, marginTop: -10 }}>0.4271 {props.unit}</p>
            </TD>
            <TD>
              {props.unit === 'ETH' && <Switch onColor={'#00D395'} onChange={() => { }} checked={true} width={36} height={18} />}
              {props.unit === 'USDC' && <div style={{ float: 'right' }}>
                <Chart></Chart>
                <span>0%</span>
              </div>}
            </TD>
          </TR>
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
              <TR2 key={index}>
                <TD style={{ textAlign: 'left', paddingLeft: 18 }} onClick={() => props.onClickItem()}>
                  <div>
                    <img src={'assets/' + item.img} alt={'asset'} />
                    <span>{item.title}</span>
                  </div>
                </TD>
                <TD>
                  <p>{item.earned_percent}%</p>
                </TD>
                <TD>
                  <p>{item.balance_dollar + ' ' + item.unit}</p>
                </TD>
                <TD>
                  {props.unit === 'ETH' && <Switch onColor={'#00D395'} onChange={() => props.modalCollaterial(item.collateral)} checked={item.collateral} width={36} height={18} />}
                  {props.unit === 'USDC' && <p>${item.liquidity}</p>}
                </TD>
              </TR2>
            )}
          </tbody>
        </Table>
      }
    </div>
  )
}

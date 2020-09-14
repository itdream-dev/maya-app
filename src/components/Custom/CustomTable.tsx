import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
const TR = styled.tr`
  border: 1px solid #dddddd;
  padding: 8px;
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

export const CustomTable = (props: any) => {
  return (
    <Table>
      <TR>
        <TH style={{ textAlign: 'left', paddingLeft: 18 }}>Asset</TH>
        <TH style={{ width: 160 }}>APY/Earned</TH>
        <TH style={{ width: 160 }}>Balance</TH>
        <TH style={{ width: 120 }}>Collateral</TH>
      </TR>
      { props.data.map((item: any, index: number) =>
        <TR key={index} style={{ borderBottom: '1px solid red' }}>
          <TD style={{ textAlign: 'left', paddingLeft: 18 }}>
            <div>
              <img src={'assets/' + item.img} alt={'asset'} />
              <span>Ether</span>
            </div>
          </TD>
          <TD>
            <p>{item.earned_percent}%</p>
            <p style={{ color: '#AAB8C1', fontWeight: 600, marginTop: -10 }}>0.000027 ETH</p>
          </TD>
          <TD>
            <p>$164</p>
            <p style={{ color: '#AAB8C1', fontWeight: 600, marginTop: -10 }}>0.421 ETH</p>
          </TD>
          <TD>
            <p>Switch</p>
          </TD>
        </TR>
      )}
    </Table>
  )
}

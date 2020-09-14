import React from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'
import { CustomTable } from '../../components/Custom/CustomTable'

export default function Supply() {
  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'supply'} />
        <Wrapper id="supply-page"></Wrapper>
        <CustomTable data={mokeData} />
      </AppBody>
    </>
  )
}


const mokeData = [
  { id: 1, img: 'asset_BAT.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.73, balance_eth: 0.4271, collateral: true },
  { id: 2, img: 'asset_COMP.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 267.73, balance_eth: 0.4271, collateral: false },
  { id: 3, img: 'asset_DAI.svg', earned_percent: 1.86, earned_eth: 0.0027, balance_dollar: 167.73, balance_eth: 0.9271, collateral: false },
  { id: 4, img: 'asset_ETH.svg', earned_percent: 7.86, earned_eth: 0.0037, balance_dollar: 147.73, balance_eth: 0.4271, collateral: true },
  { id: 5, img: 'asset_REP.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 6, img: 'asset_SAI.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 7, img: 'asset_USDC.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 8, img: 'asset_USDT.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 9, img: 'asset_ZRX.svg', earned_percent: 7.86, earned_eth: 0.0022, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 10, img: 'compound-interface.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 11, img: 'ctoken_bat.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.7471, collateral: true },
  { id: 12, img: 'ctoken_dai.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 13, img: 'ctoken_eth.svg', earned_percent: 3.06, earned_eth: 0.0047, balance_dollar: 127.23, balance_eth: 0.4471, collateral: true },
  { id: 14, img: 'ctoken_rep.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 15, img: 'ctoken_sai.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 16, img: 'ctoken_usdc.svg', earned_percent: 1.86, earned_eth: 0.0017, balance_dollar: 167.23, balance_eth: 0.1471, collateral: true },
  { id: 17, img: 'ctoken_usdt.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 137.23, balance_eth: 0.4471, collateral: true },
  { id: 18, img: 'ctoken_wbtc.svg', earned_percent: 7.86, earned_eth: 0.0027, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
  { id: 19, img: 'ctoken_zrx.svg', earned_percent: 2.86, earned_eth: 0.0067, balance_dollar: 167.23, balance_eth: 0.4471, collateral: true },
]

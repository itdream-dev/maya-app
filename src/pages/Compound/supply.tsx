import React, { useState } from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'
import { CustomTable } from '../../components/Custom/CustomTable'
import Modal from '../../components/Modal'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { CustomSupplyModal } from '../../components/Modal/CustomSupplyModal'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 18px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
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

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  // padding: 2rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  width: 420px;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`

export default function Supply() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  function getModalContent() {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <img src={'assets/asset_ETH.svg'} alt='eth img'></img>
          {'Ether'}
        </HeaderRow>
        <ContentWrapper>
            <CustomSupplyModal />
        </ContentWrapper>
      </UpperSection>
    )
  }
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'supply'} />
        <Wrapper id="supply-page"></Wrapper>
        <p onClick={()=>setModalOpen(!modalOpen)}>Heya guys!</p>
        <CustomTable
          data={mokeData}
          cols1={[
            { title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 } },
            { title: 'APY/Earned', style: { width: 160 } },
            { title: 'Balance', style: { width: 160 } },
            { title: 'Collateral', style: { width: 120 } },
          ]}
          cols2={[
            { title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 } },
            { title: 'APY', style: { width: 160 } },
            { title: 'Wallet', style: { width: 160 } },
            { title: 'Collateral', style: { width: 120 } },
          ]}
          unit={'ETH'}
          header_img={'ctoken_eth.svg'}
          header_title={'Ether'}
          onClickItem={toggleModal}
        />
        <Modal isOpen={modalOpen} onDismiss={toggleModal} minHeight={false}>
          <Wrapper>{getModalContent()}</Wrapper>
        </Modal>
      </AppBody>
    </>
  )
}

const mokeData = [
  { id: 1, img: 'asset_BAT.svg', unit: 'BAT', title: 'Basic Attention', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.09, balance_eth: 0.4271, collateral: true },
  { id: 2, img: 'asset_COMP.svg', unit: 'COMP', title: 'COMP', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.25, balance_eth: 0.4271, collateral: false },
  { id: 3, img: 'asset_DAI.svg', unit: 'DAI', title: 'Dai', earned_percent: 0.06, earned_eth: 0.0027, balance_dollar: 0.13, balance_eth: 0.9271, collateral: false },
  { id: 4, img: 'asset_ETH.svg', unit: 'ETH', title: 'ETH', earned_percent: 0.86, earned_eth: 0.0037, balance_dollar: 0.23, balance_eth: 0.4271, collateral: true },
  { id: 5, img: 'asset_REP.svg', unit: 'REP', title: 'Wrapped BTC', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 6, img: 'asset_SAI.svg', unit: 'SAI', title: '0x Protocol Tok', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 7, img: 'asset_USDC.svg', unit: 'USDC', title: 'USDC', earned_percent: 0.42, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 8, img: 'asset_USDT.svg', unit: 'USDT', title: 'Tether', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 9, img: 'asset_ZRX.svg', unit: 'ZRX', title: 'ZRX', earned_percent: 0.86, earned_eth: 0.0022, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 10, img: 'ctoken_bat.svg', unit: 'BAT', title: 'BAT', earned_percent: 0.23, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.7471, collateral: true },
  { id: 11, img: 'ctoken_dai.svg', unit: 'DAI', title: 'DAI', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 12, img: 'ctoken_eth.svg', unit: 'ETH', title: 'ETH', earned_percent: 0.33, earned_eth: 0.0047, balance_dollar: 0.13, balance_eth: 0.4471, collateral: false },
  { id: 13, img: 'ctoken_rep.svg', unit: 'REP', title: 'REP', earned_percent: 0.24, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 14, img: 'ctoken_sai.svg', unit: 'SAI', title: 'SAI', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 15, img: 'ctoken_usdc.svg', unit: 'USDC', title: 'USDC', earned_percent: 0.26, earned_eth: 0.0017, balance_dollar: 0, balance_eth: 0.1471, collateral: false },
  { id: 16, img: 'ctoken_usdt.svg', unit: 'USDT', title: 'USDT', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.23, balance_eth: 0.4471, collateral: true },
  { id: 17, img: 'ctoken_wbtc.svg', unit: 'WBTC', title: 'WBTC', earned_percent: 0.12, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
  { id: 18, img: 'ctoken_zrx.svg', unit: 'ZRX', title: 'ZRX', earned_percent: 0.91, earned_eth: 0.0067, balance_dollar: 0, balance_eth: 0.4471, collateral: false },
]
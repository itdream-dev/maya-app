import React, { useState } from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { CustomTable } from '../../components/Custom/CustomTable'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { CustomBorrowModal } from '../../components/Modal/CustomBorrowModal'
import Modal from '../../components/Modal'
import { Wrapper } from '../../components/swap/styleds'

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

export default function Borrow() {
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
          <img src={'assets/asset_USDC.svg'} alt='eth img'></img>
          {'USD Coin'}
        </HeaderRow>
        <ContentWrapper>
            <CustomBorrowModal />
        </ContentWrapper>
      </UpperSection>
    )
  }
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'borrow'} />
        <CustomTable
          data={mokeData}
          cols1={[
            {title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 }},
            {title: 'APY/Accrued', style: { width: 160 }},
            {title: 'Balance', style: { width: 160 }},
            {title: '% Of Limit', style: { width: 120 }},
          ]}
          cols2={[
            {title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 }},
            {title: 'APY', style: { width: 160 }},
            {title: 'Wallet', style: { width: 160 }},
            {title: 'Liquidity', style: { width: 120 }},
          ]}
          unit={'USDC'}
          header_img={'asset_USDC.svg'}
          header_title={'USD Coin'}
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
  { id: 1, img: 'asset_BAT.svg', unit: 'BAT', title: 'Basic Attention', earned_percent: 0.48, earned_eth: 0.0027, balance_dollar: 0.09, balance_eth: 0.4271, liquidity: '79K' },
  { id: 2, img: 'asset_COMP.svg', unit: 'COMP', title: 'COMP', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.25, balance_eth: 0.4271, liquidity: '206.40M'  },
  { id: 3, img: 'asset_DAI.svg', unit: 'DAI', title: 'Dai', earned_percent: 3.06, earned_eth: 0.0027, balance_dollar: 0.13, balance_eth: 0.9271, liquidity: '145K'  },
  { id: 4, img: 'asset_ETH.svg', unit: 'ETH', title: 'ETH', earned_percent: 0.86, earned_eth: 0.0037, balance_dollar: 0.23, balance_eth: 0.4271, liquidity: '364K'  },
  { id: 5, img: 'asset_REP.svg', unit: 'REP', title: 'Wrapped BTC', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, liquidity: '99K'  },
  { id: 6, img: 'asset_SAI.svg', unit: 'SAI', title: '0x Protocol Tok', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, liquidity: '25K'  },
  { id: 7, img: 'asset_USDC.svg', unit: 'USDC', title: 'USDC', earned_percent: 2.42, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, liquidity: '310K'  },
  { id: 8, img: 'asset_USDT.svg', unit: 'USDT', title: 'Tether', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, liquidity: '72K'  },
  { id: 9, img: 'asset_ZRX.svg', unit: 'ZRX', title: 'ZRX', earned_percent: 0.86, earned_eth: 0.0022, balance_dollar: 0, balance_eth: 0.4471, liquidity: '16K'  },
 ]
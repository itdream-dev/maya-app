import { Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount, Fraction } from '@uniswap/sdk'
import { TransactionResponse } from '@ethersproject/providers'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallback, useMemo } from 'react'
import ERC20_INTERFACE from '../../constants/abis/erc20'
import CTOKEN_INTERFACE from '../../constants/abis/ctoken'
import { useActiveWeb3React } from '../../hooks'
import { useMulticallContract, useComptrollerContract, useTokenContract, useContract } from '../../hooks/useContract'
import { isAddress } from '../../utils'
import { useSingleCallResult, useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks'
import { useTransactionAdder, useHasPendingApproval } from '../transactions/hooks'
import { calculateGasMargin } from '../../utils'
import { parseUnits } from '@ethersproject/units'
export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}

export function useRepayCallBack(
  token?: any,
  amount?: string  
): [() => Promise<void>] {  
  
  const tokenContract = useContract(token?.ctoken_address, CTOKEN_INTERFACE)
  const addTransaction = useTransactionAdder()

  const repay = useCallback(async (): Promise<void> => {
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amount){
      console.error('Amount is null')
      return
    }
    const amountConvert = parseUnits(amount, token.decimals);    
    const estimatedGas = await tokenContract.estimateGas.repayBorrow(amountConvert.toString());

    return tokenContract
      .repayBorrow(amountConvert.toString(), {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Withdraw ' + token.symbol          
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to withdraw token', error)
        throw error
      })
  }, [token, tokenContract, amount, addTransaction])

  return [repay]
}

export function useBorrowCallBack(
  token?: any,
  amount?: string  
): [() => Promise<void>] {  
  
  const tokenContract = useContract(token?.ctoken_address, CTOKEN_INTERFACE)
  const addTransaction = useTransactionAdder()

  const borrow = useCallback(async (): Promise<void> => {
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amount){
      console.error('Amount is null')
      return
    }
    const amountConvert = parseUnits(amount, token.decimals);    
    const estimatedGas = await tokenContract.estimateGas.borrow(amountConvert.toString());

    return tokenContract
      .borrow(amountConvert.toString(), {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Withdraw ' + token.symbol          
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to withdraw token', error)
        throw error
      })
  }, [token, tokenContract, amount, addTransaction])

  return [borrow]
}

export function useWithdrawCallBack(
  token?: any,
  amount?: string  
): [() => Promise<void>] {  
  
  const tokenContract = useContract(token?.ctoken_address, CTOKEN_INTERFACE)
  const addTransaction = useTransactionAdder()

  const withdraw = useCallback(async (): Promise<void> => {
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amount){
      console.error('Amount is null')
      return
    }
    const amountConvert = parseUnits(amount, token.decimals);    
    const estimatedGas = await tokenContract.estimateGas.redeemUnderlying(amountConvert.toString());

    return tokenContract
      .redeemUnderlying(amountConvert.toString(), {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Withdraw ' + token.symbol          
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to withdraw token', error)
        throw error
      })
  }, [token, tokenContract, amount, addTransaction])

  return [withdraw]
}

export function useSupplyCallBack(
  token?: any,
  amount?: string  
): [() => Promise<void>] {  
  
  const tokenContract = useContract(token?.ctoken_address, CTOKEN_INTERFACE)
  const addTransaction = useTransactionAdder()

  const supply = useCallback(async (): Promise<void> => {
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amount){
      console.error('Amount is null')
      return
    }    
    const amountConvert = parseUnits(amount, token.decimals);        
    const estimatedGas = await tokenContract.estimateGas.mint(amountConvert.toString());

    return tokenContract
      .mint(amountConvert.toString(), {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Supply ' + token.symbol          
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to supply token', error)
        throw error
      })
  }, [token, tokenContract, amount, addTransaction])

  return [supply]
}

export function useApproveCallback(
  token?: any,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const pendingApproval = useHasPendingApproval(token?.address, spender)
  const currentAllowance = useTokenGetAllowance(token)[0];
  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!token || !spender) return ApprovalState.UNKNOWN
    if (token.symbol === 'ETH') return ApprovalState.APPROVED
    
    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan('1000000000000000000000000')
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [token, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, '1000000000000000000000000')
    })

    return tokenContract
      .approve(spender, useExact ? '1000000000000000000000000' : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + token.symbol,
          approval: { tokenAddress: token.address, spender: spender }
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, spender, addTransaction])

  return [approvalState, approve]
}

export function useTokenGetAllowance(  
  token: any | undefined,  
): [TokenAmount, boolean] {  
  const { account } = useActiveWeb3React()
  const contract = useTokenContract(token.address);
  const address = account ? account : ''
  const result = useSingleCallResult(contract, 'allowance', [address, token.ctoken_address]).result
  
  const anyLoading: boolean = useMemo(() => result !== undefined, [result])
  
  return [
    useMemo(
      () => {        
        if (result !== undefined){
          console.log('useTokenGetAllowance result', result);
          const res = new TokenAmount(token, JSBI.BigInt(result));
          return res;
        }
        var res = new TokenAmount(token, JSBI.BigInt(0));
        if (token.address === '0x0')
          res = new TokenAmount(token, JSBI.BigInt(1));
        return res;        
      },
      [token, result]
    ),
    anyLoading
  ]  
}

export function useTokenGetbalanceOfUnderlying(    
    address?: string,
    tokens?: (any)[]
  ): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  
    const { chainId  } = useActiveWeb3React()
     
    const validatedTokens: (any)[] = useMemo(
      () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.ctoken_address) !== false) ?? [],
      [tokens, chainId]
    )
  
    const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.ctoken_address), [validatedTokens])
  
    const balances = useMultipleContractSingleData(validatedTokenAddresses, CTOKEN_INTERFACE, 'balanceOfUnderlying', [address])
    console.log('balances', balances);
    const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])
  
    return [
      useMemo(
        () =>
          address && validatedTokens.length > 0
            ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
                const value = balances?.[i]?.result?.[0]
                const amount = value ? JSBI.BigInt(value.toString()) : undefined
                if (amount) {
                  memo[token.ctoken_address] = new TokenAmount(token, amount)
                }
                return memo
              }, {})
            : {},
        [address, validatedTokens, balances]
      ),
      anyLoading
    ]
}

export function useTokenGetborrowBalanceCurrent(    
  address?: string,
  tokens?: (any)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {

  const { chainId  } = useActiveWeb3React()
   
  const validatedTokens: (any)[] = useMemo(
    () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.ctoken_address) !== false) ?? [],
    [tokens, chainId]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.ctoken_address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, CTOKEN_INTERFACE, 'borrowBalanceCurrent', [address])  
  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.ctoken_address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useTokenGetCollateralEnabled(  
  tokens?: (any)[] | undefined  
): [{ [tokenAddress: string]: boolean }, boolean] {
  
  const { chainId, account } = useActiveWeb3React()
  console.log('useTokenGetCollateralEnabled chainId', chainId);
  const validatedTokens: (any)[] = useMemo(
    () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.ctoken_address) !== false) ?? [],
    [tokens, chainId]
  )
  console.log('useTokenGetCollateralEnabled validatedTokens', validatedTokens);
  const contract = useComptrollerContract()  
  const address = account ? account : undefined
  console.log('useTokenGetCollateralEnabled address', address);
  const result = useSingleCallResult(contract, 'getAssetsIn', [address])?.result;
  console.log('getAssetsIn result', result);
  const anyLoading: boolean = useMemo(() => result !== undefined, [result])
  
  return [
    useMemo(
      () =>
      validatedTokens !== undefined && validatedTokens.length > 0 && result !== undefined && result.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: boolean }>((memo, token) => {              
              let value = false;
              for (let j = 0; j < result[0].length; j++){                
                if (result[0][j] === token.ctoken_address){
                  value = true;
                  break;
                }
              }         
              memo[token.ctoken_address] = value;    
              return memo
            }, {})
          : {},
      [validatedTokens, result]
    ),
    anyLoading
  ]
  
}

export function useTokenGetBorrowAPYS(  
  tokens?: (any)[] | undefined
): [{ [tokenAddress: string]: string }, boolean] {
  
  const { chainId } = useActiveWeb3React()

  const validatedTokens: (any)[] = useMemo(
    () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.ctoken_address) !== false) ?? [],
    [tokens, chainId]
  )

  console.log('chainId', chainId);

  const validatedTokenAddresses = useMemo(() => validatedTokens !== undefined ? validatedTokens.map(vt => vt !== undefined ? vt.ctoken_address : false) : [], [validatedTokens])
  console.log('validatedTokenAddresses', validatedTokenAddresses);

  const rates = useMultipleContractSingleData(validatedTokenAddresses, CTOKEN_INTERFACE, 'borrowRatePerBlock', [])
  console.log('rates', rates);
  const anyLoading: boolean = useMemo(() => rates.some(callState => callState.loading), [rates])
  
  return [
    useMemo(
      () =>
      validatedTokens !== undefined && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: string }>((memo, token, i) => {
              const value = rates?.[i]?.result?.[0]      
     
              if (value){
                const blocksPerDay = 4 * 60 * 24;
                const daysPerYear = 364;                            
                const Mantissa = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18));         
                const a = new Fraction(JSBI.BigInt(value), Mantissa);                          
                const b = a.multiply(JSBI.BigInt(blocksPerDay));
                const c = b.add(JSBI.BigInt(1));
                const d = Math.pow(parseFloat(c.toFixed(18)), daysPerYear);
                const e = d - 1;
                const supplyApy = e * 100                               
                console.log(token.ctoken_name, d, supplyApy);
                if (supplyApy) {
                  memo[token.ctoken_address] = supplyApy.toFixed(2);
                }                
              }
              return memo
              
            }, {})
          : {},
      [validatedTokens, rates]
    ),
    anyLoading
  ]
}


export function useTokenGetSupplyAPYS(  
  tokens?: (any)[] | undefined
): [{ [tokenAddress: string]: string }, boolean] {
  
  //const { account, chainId } = useActiveWeb3React()
  const chainId = 1;
  const validatedTokens: (any)[] = useMemo(
    () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.ctoken_address) !== false) ?? [],
    [tokens, chainId]
  )

  console.log('chainId, account', chainId);

  const validatedTokenAddresses = useMemo(() => validatedTokens !== undefined ? validatedTokens.map(vt => vt !== undefined ? vt.ctoken_address : false) : [], [validatedTokens])
  console.log('validatedTokenAddresses', validatedTokenAddresses);

  const rates = useMultipleContractSingleData(validatedTokenAddresses, CTOKEN_INTERFACE, 'supplyRatePerBlock', [])
  console.log('rates', rates);
  const anyLoading: boolean = useMemo(() => rates.some(callState => callState.loading), [rates])
  
  return [
    useMemo(
      () =>
      validatedTokens !== undefined && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: string }>((memo, token, i) => {
              const value = rates?.[i]?.result?.[0]      
     
              if (value){
                const blocksPerDay = 4 * 60 * 24;
                const daysPerYear = 364;                            
                const Mantissa = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18));         
                const a = new Fraction(JSBI.BigInt(value), Mantissa);                          
                const b = a.multiply(JSBI.BigInt(blocksPerDay));
                const c = b.add(JSBI.BigInt(1));
                const d = Math.pow(parseFloat(c.toFixed(18)), daysPerYear);
                const e = d - 1;
                const supplyApy = e * 100                               
                console.log(token.ctoken_name, d, supplyApy);
                if (supplyApy) {
                  memo[token.ctoken_address] = supplyApy.toFixed(2);
                }                
              }
              return memo
              
            }, {})
          : {},
      [validatedTokens, rates]
    ),
    anyLoading
  ]
}


/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[]
): { [address: string]: CurrencyAmount | undefined } {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address])
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (any)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {

  const { chainId  } = useActiveWeb3React()
   
  const validatedTokens: (any)[] = useMemo(
    () => tokens?.filter((t) => t !== undefined && t.chainId === chainId && isAddress(t.address) !== false) ?? [],
    [tokens, chainId]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (any)[]
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(() => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [], [
    currencies
  ])

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some(currency => currency === ETHER) ?? false, [currencies])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return undefined
        if (currency instanceof Token) return tokenBalances[currency.address]
        if (currency === ETHER) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0]
}


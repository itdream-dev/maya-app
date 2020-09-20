import { Interface } from '@ethersproject/abi'
import CTOKEN_ABI from './ctoken.json'


const CTOKEN_INTERFACE = new Interface(CTOKEN_ABI)
export default CTOKEN_INTERFACE


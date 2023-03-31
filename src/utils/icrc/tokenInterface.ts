import { Principal } from '@dfinity/principal';

import { Metadata as Dip20Metadata } from './dip_20';
import { TokenMetaData as ExtMetadata } from './ext';

export interface Token {
  logo: string;
  name: string;
  description: string;
  website: string;
  principal_id: Principal;
  standard: string;
  total_supply: [] | [bigint];
  symbol: string;
}

export type TokenMetadata = ExtMetadata | Dip20Metadata;

export interface FungibleMetadata {
  fungible: TokenMetadata & {
    metadata?: Int8Array[];
  };
}

export interface NonFungibleMetadata {
  nonfungible: {
    metadata: Int8Array[];
  };
}
export type Metadata = FungibleMetadata | NonFungibleMetadata;

export {
  SendOpts,
  SendParams,
  SendResponse,
  BalanceResponse,
  BurnParams,
} from './methods';
export { EventDetail, BurnResult } from './xtc';

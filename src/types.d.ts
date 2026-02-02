interface CryptoData {
  symbol: string;
  name: string;
  id: string;
  balance: number;
  icon_image: string;
  network_image: string | null;
  network: string | null;
  on: boolean;
  price: number;
  change24h: number;
  volume_24h: number;
  market_cap: number;
}

type UserCoin = {
  BTC: {
    balance: number,
    on: boolean
  },
  "USDT_TRC20": {
    balance: number,
    on: boolean,
    network: "TRC20"
  },
  "USDT_BNB": {
    balance: number,
    on: boolean,
    network: "BNB"
  },
  "USDT_ERC20": {
    balance: number,
    on: boolean,
    network: "ERC20"
  },
  ETH: {
    balance: number,
    on: boolean
  },
  TRX: {
    balance: number,
    on: boolean
  },
  BNB: {
    balance: number,
    on: boolean
  },
  DOT: {
    balance: number,
    on: boolean
  },
  BCH: {
    balance: number,
    on: boolean
  },
  LTC: {
    balance: number,
    on: boolean
  },
  XLM: {
    balance: number,
    on: boolean
  },
  DASH: {
    balance: number,
    on: boolean
  },
  SOL: {
    balance: number,
    on: boolean
  },
  DOGE: {
    balance: number,
    on: boolean
  },
  XDC: {
    balance: number,
    on: boolean
  },
  XRP: {
    balance: number,
    on: boolean
  }
}

type FromAndTo = {
  symbol: string
  name: string
  balance: number
  icon_image: string
  network_image: string | null,
  network: string | null,
  on: boolean
  price: number
}

type NotificationType = {
  _id: string;
  userId: string;
  type: "swap" | "deposit" | "withdraw" | "buy" | "recieve" | "kyc_update" | "wallet_connect";
  title?: string;
  description?: string;
  from?: string;
  to?: string;
  fromAmount?: number
  toAmount?: number
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

type KycStatus = 'not_submitted' | 'pending' | 'approved' | 'rejected'
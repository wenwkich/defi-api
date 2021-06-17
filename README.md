# Defi API

A very simple query api for DeFi applications, including making contract call, query token price, query token balance

# API Formet

`/api/{ network_name }/{ native | tokens | contracts }/[[{ token_address | contract_address }]/{ function_name }[?address=]]`

`network_name` could be `ethereum`, `bsc`, `polygon`, `fantom`, `xdai`

note that token price usually takes path with two tokens

e.g. native token balance `/api/bsc/native/balance?address={{address}}`

e.g. native token price `/api/ethereum/native/price`

e.g. erc20 token balance `/api/fantom/tokens/0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56/balance?address={{address}}`

e.g. erc20 token price `/api/fantom/tokens/0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56/price?vsAddr=0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83&dexAddr=0xF491e7B69E4244ad4002BC14e878a34207E38c29`

Note that skipping `vsAddr` and `dexAddr` will fallback to native token and a default dex

e.g. staking token balance `/api/fantom/contracts/0x742474dAE70Fa2AB063aB786b1fBe5704e861a0c/call` with post
```json
{
    "abi": [
        "function userInfo(uint,address) public view returns(uint)"
    ],
    "methodName": "userInfo",
    "args": [
        2, "{{address}}"
    ]
}
```

More examples are in the postman collection
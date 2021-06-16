# Defi API

A custom api for defi portfolio dashboard (no need to connect to metamask)

# API Formet

`/api/{network_name}/{native | tokens | stakes}/[[{token_name | stake_name}]/{function_name}[?address=]]`

e.g. native token balance `/api/ethereum/native/balance?address=0x`

e.g. native token price `/api/ethereum/native/price`

e.g. erc20 token price `/api/fantrom/tokens/zoo/balance`

e.g. get all the erc20 tokens `/api/fantom/tokens`

e.g. staking token balance `/api/fantom/stakes/qi/balance?address=0x&input_tokens=DAI,WETH`

e.g. get all the stakes `/api/fantom/stakes`

`network_name` could be `ethereum`, `bsc`, `polygon`, `fantom`, `xdai`

note that token price usually takes single path
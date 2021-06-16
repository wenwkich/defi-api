# Defi API

A custom api for defi portfolio dashboard (no need to connect to metamask)

# API Formet

`/api/{network_name}/{token_name or contract_name}/{function_name}[?address=]`

e.g. native token balance `/api/ethereum/eth/balance?address=0x`

e.g. native token price `/api/ethereum/eth/price`

e.g. mining token balance `/api/fantom/qi/double-balance?address=0x`

`network_name` could be `ethereum`, `bsc`, `polygon`, `fantom`, `xdai`
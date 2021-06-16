# Defi API

A custom api for defi portfolio dashboard (no need to connect to metamask)

# API Formet

`/api/{network_name}/{native | contract_name | token_name}/{function_name}[?address=]`

e.g. native token balance `/api/ethereum/native/balance?address=0x`

e.g. native token price `/api/ethereum/native/price`

e.g. mining token balance `/api/fantom/qi/double-balance?address=0x&input_tokens=0xaa,0xbb`

`network_name` could be `ethereum`, `bsc`, `polygon`, `fantom`, `xdai`
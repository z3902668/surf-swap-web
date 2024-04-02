export type SurfSwap = {
  "version": "0.1.0",
  "name": "surf_swap",
  "instructions": [
    {
      "name": "initGlobalConfig",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitGlobalConfigParams"
          }
        }
      ]
    },
    {
      "name": "updateGlobalConfig",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateGlobalConfigParams"
          }
        }
      ]
    },
    {
      "name": "transferOwnership",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreatePoolParams"
          }
        }
      ]
    },
    {
      "name": "increaseLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userLiquidityInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "IncreaseLiquidityParams"
          }
        }
      ]
    },
    {
      "name": "openPosition",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionParams"
          }
        }
      ]
    },
    {
      "name": "swapBaseIn",
      "accounts": [
        {
          "name": "ammInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrderInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrdersInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketBidsInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAsksInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEventQueueInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketVaultSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionOutTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapBaseInParams"
          }
        }
      ]
    },
    {
      "name": "swapBaseOut",
      "accounts": [
        {
          "name": "ammInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrderInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrdersInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketBidsInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAsksInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEventQueueInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketVaultSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionOutTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapBaseOutParams"
          }
        }
      ]
    },
    {
      "name": "closePosition",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "decreaseLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userLiquidityInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "DecreaseLiquidityParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalConfigInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "raydiumAmmProgram",
            "type": "publicKey"
          },
          {
            "name": "serumProgram",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "maxLeverage",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "reserveRate",
            "type": "u32"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "liquidationRate",
            "type": "u32"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "liquidity",
            "type": "u64"
          },
          {
            "name": "borrowed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userLiquidityInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "liquidityAmount",
            "type": "u64"
          },
          {
            "name": "lastAccPerLiquidity",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "userPositionInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "userAmount",
            "type": "u64"
          },
          {
            "name": "borrowAmount",
            "type": "u64"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "openAt",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitGlobalConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "raydiumAmmProgram",
            "type": "publicKey"
          },
          {
            "name": "serumProgram",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateGlobalConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrowFeeRate",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "raydiumAmmProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "serumProgram",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "CreatePoolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxLeverage",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "reserveRate",
            "type": "u32"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "liquidationRate",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "DecreaseLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "IncreaseLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "minLiquidityAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OpenPositionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAmount",
            "type": "u64"
          },
          {
            "name": "borrowAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapBaseInParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minimumAmountOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapBaseOutParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxAmountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PoolStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnInitialized"
          },
          {
            "name": "Available"
          },
          {
            "name": "WithdrawOnly"
          },
          {
            "name": "Closed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OutOfRange",
      "msg": "value out of range"
    },
    {
      "code": 6001,
      "name": "IllegalPoolStatus",
      "msg": "illegal pool status"
    },
    {
      "code": 6002,
      "name": "Slippage",
      "msg": "out of slippage"
    },
    {
      "code": 6003,
      "name": "OutOfLeverage",
      "msg": "out of leverage"
    },
    {
      "code": 6004,
      "name": "OutOfPool",
      "msg": "pool balance not enough"
    }
  ]
};

export const IDL: SurfSwap = {
  "version": "0.1.0",
  "name": "surf_swap",
  "instructions": [
    {
      "name": "initGlobalConfig",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitGlobalConfigParams"
          }
        }
      ]
    },
    {
      "name": "updateGlobalConfig",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateGlobalConfigParams"
          }
        }
      ]
    },
    {
      "name": "transferOwnership",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "globalConfigAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreatePoolParams"
          }
        }
      ]
    },
    {
      "name": "increaseLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userLiquidityInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "IncreaseLiquidityParams"
          }
        }
      ]
    },
    {
      "name": "openPosition",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionParams"
          }
        }
      ]
    },
    {
      "name": "swapBaseIn",
      "accounts": [
        {
          "name": "ammInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrderInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrdersInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketBidsInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAsksInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEventQueueInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketVaultSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionOutTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapBaseInParams"
          }
        }
      ]
    },
    {
      "name": "swapBaseOut",
      "accounts": [
        {
          "name": "ammInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthorityInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrderInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrdersInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "serumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketBidsInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketAsksInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEventQueueInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketCoinVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketPcVaultInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketVaultSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalConfigInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionOutTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapBaseOutParams"
          }
        }
      ]
    },
    {
      "name": "closePosition",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userPositionInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "decreaseLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userLiquidityInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "DecreaseLiquidityParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalConfigInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "raydiumAmmProgram",
            "type": "publicKey"
          },
          {
            "name": "serumProgram",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "maxLeverage",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "reserveRate",
            "type": "u32"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "liquidationRate",
            "type": "u32"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "liquidity",
            "type": "u64"
          },
          {
            "name": "borrowed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userLiquidityInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "liquidityAmount",
            "type": "u64"
          },
          {
            "name": "lastAccPerLiquidity",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "userPositionInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "userAmount",
            "type": "u64"
          },
          {
            "name": "borrowAmount",
            "type": "u64"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "openAt",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitGlobalConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "raydiumAmmProgram",
            "type": "publicKey"
          },
          {
            "name": "serumProgram",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateGlobalConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "borrowFeeRate",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "raydiumAmmProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "serumProgram",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "CreatePoolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxLeverage",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "reserveRate",
            "type": "u32"
          },
          {
            "name": "borrowFeeRate",
            "type": "u32"
          },
          {
            "name": "liquidationRate",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "DecreaseLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "IncreaseLiquidityParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "minLiquidityAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OpenPositionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAmount",
            "type": "u64"
          },
          {
            "name": "borrowAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapBaseInParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minimumAmountOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapBaseOutParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxAmountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PoolStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnInitialized"
          },
          {
            "name": "Available"
          },
          {
            "name": "WithdrawOnly"
          },
          {
            "name": "Closed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OutOfRange",
      "msg": "value out of range"
    },
    {
      "code": 6001,
      "name": "IllegalPoolStatus",
      "msg": "illegal pool status"
    },
    {
      "code": 6002,
      "name": "Slippage",
      "msg": "out of slippage"
    },
    {
      "code": 6003,
      "name": "OutOfLeverage",
      "msg": "out of leverage"
    },
    {
      "code": 6004,
      "name": "OutOfPool",
      "msg": "pool balance not enough"
    }
  ]
};

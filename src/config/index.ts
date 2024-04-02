import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

export type Token = {
    mint: PublicKey
    decimals: number
}

export const RAY: Token = {
    mint: new anchor.web3.PublicKey('GziCFD5krogrse1EypTVjGxZGwY6DDRteTfdmvyVDqeH'),
    decimals: 6
};
export const USDC: Token = {
    mint: new anchor.web3.PublicKey('ESTgXYjrwTHGwSfZZLUPB7zxD6vMszHAamgN5P8Qo4Sg'),
    decimals: 6
};
export const PROGRAM_ID = new anchor.web3.PublicKey("6N2tst9KWHb6ARsEfEcPL35FBwHy2BSRBJeBqn7pxpbL");


export const connection = new Connection("https://api.devnet.solana.com");

export const raydiumAmmProgram = new anchor.web3.PublicKey('HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8');
export const serumProgram = new anchor.web3.PublicKey('EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj');

export const ammInfo = new anchor.web3.PublicKey('A9z2G1UCHJYukBJAdpWd4WrVw4NMXR7ca7Jx3jtETW3W')
export const ammAuthorityInfo = new anchor.web3.PublicKey('DbQqP6ehDYmeYjcBaMRuA8tAJY1EjDUz9DpwSLjaQqfC');
export const ammOpenOrderInfo = new anchor.web3.PublicKey('BaVjNRyujy6ShfpZDpZLWjfPGviMsMhRQVCHbWfqNSfV');
export const ammTargetOrdersInfo = new anchor.web3.PublicKey('99jsQCMPG8HW2TwhTXs1Rdz9C9vKLG9fB1aEP8uxeN92');
export const ammCoinVaultInfo = new anchor.web3.PublicKey('DEGQyCdQTy8gsevEx563dtgEwiH6rrxSTiUrYJeftTmi');
export const ammPcVaultInfo = new anchor.web3.PublicKey('6dVtJsejfYQvBAjUBFBVNZxFNac89oP7noYRVjFFAaUi');
export const marketInfo = new anchor.web3.PublicKey('DZp9wmtPLGrUYqWMJ2a6JWtzqkub4pNmd4kHP4ULsZap');
export const marketBidsInfo = new anchor.web3.PublicKey('34HBWJqawTeBtyCkJzTxKqS4nn2HEmhy7yo6TmnnpvnU');
export const marketAsksInfo = new anchor.web3.PublicKey('BtiiRyHGAMmcw4D9aRNLf3kRL3DX1hu1TZJZSG53SUf');
export const marketEventQueueInfo = new anchor.web3.PublicKey('HFgY7QXPdfY2NzQNKg7UhfqUawyBHFKTtVf6eBQkoqUm');
export const marketCoinVaultInfo = new anchor.web3.PublicKey('2rjYzLfXd643DFAkqg4W7e4traUaD6CbJ44i2Y4zAWqF');
export const marketPcVaultInfo = new anchor.web3.PublicKey('Gs69yWTxLQQRuX1EVkxmokRNryMdfUwsGDeJPa6EMeth');
export const marketVaultSigner = new anchor.web3.PublicKey('6h3rytrC7GKnkmoyPKTp1jk2R4onp9LfadJWA9TXE1Rf');



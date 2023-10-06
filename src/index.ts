import {
  http,
  createPublicClient,
  encodeAbiParameters,
  decodeAbiParameters,
} from "viem";
import type { Address, Hex, PublicClient } from "viem";
import { mainnet } from "viem/chains";
import {ABI, BYTECODE} from "./abi.js";

const client = createPublicClient({
  chain: mainnet,
  transport: http("https://mainnet.infura.io/v3/"),
});

export async function getBalances(
  user: Address,
  tokens: Address[],
  publicClient: PublicClient
): Promise<readonly bigint[]> {

  const args = encodeAbiParameters(ABI[0].inputs, [user, tokens]);

  const data = BYTECODE + args.replace("0x", "") as Hex;


  const result = await publicClient.call({
    data,
  });

  if (!result.data) {
    throw new Error("No data returned");
  }

  const balances = decodeAbiParameters([{type: "uint256[]"}], result.data);

  return balances[0];
}


(async () => {
  const balances = await getBalances("0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E", ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"], client);
  console.log(balances);
})();


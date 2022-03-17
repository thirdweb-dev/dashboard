import { AnyContractInput } from "schema/contracts";
import { AnyTokenInput } from "schema/tokens";

export interface IFormProps {
  formId: string;
  onSubmit: (data: AnyContractInput | AnyTokenInput) => Promise<void>;
}

export enum ContractFormType {
  Protocol = "Protocol_Contract",
  Nft = "Nft_Contract",
  Pack = "Pack_Contract",
  Market = "Market_Contract",
  Coin = "Coin_Contract",
}

export enum TokenFormType {
  Nft = "Nft_Token",
}

export enum FormType {
  Contract = "Contract",
  Token = "Token",
}

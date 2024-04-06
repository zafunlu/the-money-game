import { SubscriptionTier } from "@/lib/models/User";

export enum Role {
  Default,
  Admin = 10,
}

type bankLimits = {
  banks: number;
  employees: number;
  customers: number;
  accounts: number;
  storeFronts: number;
};

type BankConfig = {
  limits: {
    [SubscriptionTier.Free]: bankLimits;
    [SubscriptionTier.Premium]: bankLimits;
    [SubscriptionTier.Family]: bankLimits;
    [SubscriptionTier.Organization]: bankLimits;
  };
};

// Eventually will come from the API
export const bankConfig: BankConfig = {
  limits: {
    [SubscriptionTier.Free]: {
      banks: 2,
      employees: 2,
      customers: 25,
      accounts: 2,
      storeFronts: 0,
    },
    [SubscriptionTier.Premium]: {
      banks: 2,
      employees: 2,
      customers: 250,
      accounts: 3,
      storeFronts: 1,
    },
    [SubscriptionTier.Family]: {
      banks: 10,
      employees: 10,
      customers: 1_000,
      accounts: 3,
      storeFronts: 3,
    },
    [SubscriptionTier.Organization]: {
      banks: 100,
      employees: 50,
      customers: 10_000,
      accounts: 3,
      storeFronts: 5,
    },
  },
};

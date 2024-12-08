"use server";


export async function createBillingInfo(input: any) {
  return input
}

export async function updateBillingInfo(input: any, billingId: string) {
  if (!input) {
    throw new Error("Input is required");
  }
  // Do something with input
  return billingId;
}

import { Methods } from "../enums/Enums";
import { createRequest } from "../helpers/GenericHelper";
import { Receipt, ReceiptRequest } from "../interfaces/GenericInterfaces";

export const getReceiptsService = async () => {
  try {
    const response = await createRequest("api/Receipts", Methods.GET);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Receipt[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setReceiptService = async (body: ReceiptRequest[]) => {
  try {
    const response = await createRequest("api/Receipts", Methods.POST, body);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Receipt = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

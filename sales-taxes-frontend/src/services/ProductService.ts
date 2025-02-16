import { Methods } from "../enums/Enums";
import { createRequest } from "../helpers/GenericHelper";
import { Product } from "../interfaces/GenericInterfaces";

export const getProductsService = async () => {
  try {
    const response = await createRequest("api/Products", Methods.GET);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setProductsService = async (body: Product) => {
  try {
    const response = await createRequest("api/Products", Methods.POST, body);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { Car } from "./CarInterface";

export const getCarsData = async (): Promise<Car[]> => {
  const response = await fetch("http://127.0.0.1:3000/garage");
  if (!response.ok) {
    throw new Error("Something goes wrong");
  }
  
  let data = await response.json();
  
  return data;
};



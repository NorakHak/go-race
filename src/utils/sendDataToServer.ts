import { Car } from "./CarInterface"

export const sendDataToServer = async (data:Car):Promise<void>=>{

    try {
    const response = await fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Something goes wrong');
    }
    console.log('Data is on server side');
  } catch (error) {
    console.error('We have an error, Houston:', error);
  }
    };


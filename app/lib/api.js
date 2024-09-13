// lib/api.js

export async function fetchProductById(id) {
  console.log(`Attempting to fetch product with ID: ${id}`);
  try {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers));
    
    const text = await response.text();
    console.log('Raw API Response:', text);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      throw new Error('Invalid JSON in API response');
    }
    
    console.log('Parsed API Response Data:', data);
    
    if (!data) {
      throw new Error(`Product with ID: ${id} not found`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID: ${id}:`, error);
    throw error;
  }
}
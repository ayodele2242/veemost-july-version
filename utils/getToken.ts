// utils/getToken.ts

const getToken = async (clientId: string, secretKey: string): Promise<string> => {
  try {
    const response = await fetch('/api/get_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientId, secretKey }),
    });

    if (!response.ok) {
      throw new Error('Error accessing token endpoint...');
    }

    const data = await response.json();
    if (data && data.token) {
      return data.token;
    } else {
      throw new Error('Access token not found in response');
    }
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export default getToken;

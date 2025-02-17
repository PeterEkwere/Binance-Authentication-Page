export const notifyNewUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to notify');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error notifying new user:', error);
    }
  };
export const notifyNewUser = async () => {
  try {
    const response = await fetch('http://18.144.169.247:5000/notify', {
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

export const listenForCommands = async () => {
  try {
    const response = await fetch('http://18.144.169.247:5000/command', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch commands');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching commands:', error);
  }
};
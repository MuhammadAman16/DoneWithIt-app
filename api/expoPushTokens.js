import client from './client';

//client module automatically includes header for authentication token
const register = pushToken =>
  client.post('/expoPushTokens', {token: pushToken});

export default {
  register,
};

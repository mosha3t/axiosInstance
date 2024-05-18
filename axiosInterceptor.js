import axios from 'axios';
import { Easing, Notifier, NotifierComponents } from 'react-native-notifier';
const baseUrl = process.env.baseUrl;

const axiosInterceptor = axios.create({
  baseURL: baseUrl,
});

axiosInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle error
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('Validation error:', error.response.data);
          break;
        case 401:
          console.error('Invalid token, user must login again');
          break;
        case 403:
          console.error("User doesn't have permission");
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 429:

          Notifier.showNotification({
            title: 'Request failed',
            description: error.response?.data?.detail || null,
            duration: 0,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            onHidden: () => console.log('Hidden'),
            onPress: () => console.log('Press'),
            hideOnPress: false,
          });



          break;
        default:
          console.error('Unhandled error:', error.response.data);
          break;
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInterceptor;

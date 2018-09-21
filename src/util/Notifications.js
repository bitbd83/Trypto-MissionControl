import { NotificationManager } from 'react-notifications';

export const Notification = (response, message = {}) =>  {
  let errorMessage = message.error ? message.error : 'Error';
  let successMessage = message.success ? message.success : 'Success';

  if(response.error){
    if(response.error.response && response.error.response.data && response.error.response.data.errorMessage){
      errorMessage = response.error.response.data.errorMessage;
    }
    NotificationManager.error(errorMessage);
  }else if (response.status) {
    const status = response.status;
    if (200 <= status < 400) {
      NotificationManager.success(successMessage);
    } else if (status >= 400) {
      NotificationManager.error(errorMessage);
    }
  }
}




















// import { NotificationManager } from 'react-notifications';

// export const Notification = (response, message = {}) =>  {
//   const errorMessage = message.error ? message.error : 'Error';
//   const successMessage = message.success ? message.success : 'Success';
//   if (response.error) {
//     NotificationManager.error(errorMessage);
//   } else if (response.status) {
//     const status = response.status;
//     if (200 <= status < 400) {
//       NotificationManager.success(successMessage);
//     } else if (status >= 400) {
//       NotificationManager.error(errorMessage);
//     }
//   }
// }

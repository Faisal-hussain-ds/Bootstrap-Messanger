/**
 * Description: This file consists of axios request plugin that can be used to make requests and errors can be handled at once rather than repeating code
 * @param {String} url
 * @param {String} methods
 * @param {Object} data object containing data to be sent with post
 * !Note: Please send empty object {} in case of GET request as parameter
 */
 import { EventBus } from "@/js/helpers/EventBus.js";
 import axios from "axios";
 export default {
   install(app) {
     const baseUrls = process.env.BACKEND_URL;
     app.config.globalProperties.apiRequest = (url, type, method, data) => {
       // convert object to formData
     var form_data = new FormData();
     for ( const key in data ) {
       if(key === 'countries') {
         for(const country of data[key]){
           form_data.append(`${key}[]`, country);
         }
       }
       else {
         form_data.append(key, data[key]);
       }
     }
     
     // end
     
       const options = {
         url: `${baseUrls}/${url}`,
         method: method,
         data: form_data,
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
           Accept:  "application/json",
           "Content-Type": "multipart/form-data",
         },
       };
       return new Promise((resolve, reject) => {
         axios(options)
           .then((res) => {
             resolve(res);
           })
           .catch((error) => {
             EventBus.emit("show-notification-bar", {
               type: "negative",
               message: error.response.data.message,
             });
             reject(error.response.data.error);
           });
       });
     };
   },
 };
 
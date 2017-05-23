# Realtime Chat with Laravel and VueJS

Complete code for the article [Create A Realtime Chatroom With Laravel, VueJS And Pusher](https://www.cloudways.com/blog/realtime-chatroom-with-laravel-vuejs-pusher/). To get started with it.

Clone the repo or download as zip. Then in your root run `composer install` and `npm install` to install the required dependencies. Copy the existing **.env.example** file and rename it to **.env**. Now add your database and Pusher credentials in it. Also set the `BROADCAST_DRIVER=` to **pusher**. Now head to **app.js** and add pusher credentials in it too. Once its added run the following command to compile it. 

`npm run dev`

Once its completed. Open the app in your browser register a new user and start using it.

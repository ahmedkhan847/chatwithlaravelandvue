
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import VueResource from "vue-resource"
import Echo from "laravel-echo"
import Pusher from "pusher-js"

Vue.use(VueResource);

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '' //Add your pusher key here
}); 

const app = new Vue({
    el: '#app',
    data: {
        countries: [],
        show : 0,
        error : 0,
        chatMessage : null,
        userId : null,
        chats : []
    },
    created(){
        window.Echo.channel('chat-message'+window.userid)
            .listen('ChatMessage', (e) => {
                this.chats.push(e.user);
                console.log("pusher");
                console.log(this.chats);
                this.userId = e.user.sourceuserid;
                this.show = 1;
        });
    },
    http: {
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    },
    methods: {
    sendMessage(){
            this.chats.push({"message" : this.chatMessage , "name" : window.username});
            console.log("send");
            console.log(this.chats);
            this.$http.post('chat',{
                'userid' : this.userId,
                'message' : this.chatMessage
            }).then(response => {
                this.chatMessage = "";
            }, response => {
                this.error = 1;
                console.log("error");
                console.log(response);
            });
        },
    getUserId(event){
        this.userId = event.target.id;
        this.show = 1;
        console.log(this.userId);
    }
}});



   

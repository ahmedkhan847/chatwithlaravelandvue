
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
    key: 'adba74bea68819d557ca' //Add your pusher key here
}); 

const app = new Vue({
    el: '#app',
    data: {
        chatMessage : [],
        userId : null,
        chats : [{"message" : '' , "name" : ""}],
        chatWindows : [],
        chatStatus : 0,
    },
    created(){
        window.Echo.channel('chat-message'+window.userid)
            .listen('ChatMessage', (e) => {
                console.log(e.user);
                if(this.chats[e.user.sourceuserid]){
                    this.chats[e.user.sourceuserid].push(e.user);
                    console.log("pusher");
                    console.log(this.chats);
                    this.userId = e.user.sourceuserid;
                    this.show = 1;
                }else{
                    this.createChatWindow(e.user.sourceuserid,e.user.name)
                    this.chats[e.user.sourceuserid].push(e.user);
                }
                
        });
    },
    http: {
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    },
    methods: {
    sendMessage(event){
            this.userId = event.target.id;
            // this.chats[this.userId].push({"message" : this.chatMessage[this.userId] , "name" : window.username});    
            var message = this.chatMessage[this.userId];
            this.chats[this.userId].push({"message" : message , "name" : window.username});
            // this.chatMessage[this.userId] = "";
            this.$http.post('chat',{
                'userid' : this.userId,
                'message' : message
            }).then(response => {
                console.log("send");
                // message = null;
            }, response => {
                this.error = 1;
                console.log("error");
                console.log(response);
            });
        },
    getUserId(event){
        this.userId = event.target.id;
        this.createChatWindow(this.userId,event.target.innerHTML);
        console.log(this.userId);
    },
    createChatWindow(userid,username){
        this.chatMessage[userid] = '';
        this.chats[userid] = [];
        this.chatWindows.push({"senderid" : userid , "name" : username});
    }
}});



   

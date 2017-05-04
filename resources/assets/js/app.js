
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
        chats : [],
        chatWindows : [],
        chatStatus : 0,
        chatWindowStatus : [],
        chatCount : [] 
    },
    created(){
        window.Echo.channel('chat-message'+window.userid)
            .listen('ChatMessage', (e) => {
                console.log(e.user);
                this.userId = e.user.sourceuserid;
                if(this.chats[this.userId]){
                    this.show = 1;
                    this.$set(app.chats[this.userId], this.chatCount[this.userId] ,e.user);
                    this.chatCount[this.userId]++;
                    console.log("pusher");
                    console.log(this.chats[this.userId]);                   
                }else{
                    this.createChatWindow(e.user.sourceuserid,e.user.name)
                    this.$set(app.chats[this.userId], this.chatCount[this.userId] ,e.user);
                    this.chatCount[this.userId]++;
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
            // this.chats[this.userId].push({"message" : message , "name" : window.username});
            // this.chatMessage[this.userId] = "";
            
            
            this.$http.post('chat',{
                'userid' : this.userId,
                'message' : message
            }).then(response => {
                // if(this.chatCount[this.userId] >= 0 && this.chatCount[this.userId] != null){
                        
                //     }else{
                //         this.chatCount[this.userId] = 0;
                //     }
                this.chatMessage[this.userId] = '';
                this.$set(app.chats[this.userId], this.chatCount[this.userId] , {
                    "message": message, 
                    "name" : window.username
            });
            this.chatCount[this.userId]++;
                console.log("send");
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
        if(!this.chatWindowStatus[userid]){
            
            this.chatWindowStatus[userid] = 1;
            this.chatMessage[userid] = '';
            // this.chats[userid] = [];
            this.$set(app.chats, userid , {});
            this.$set(app.chatCount, userid , 0);
            this.chatWindows.push({"senderid" : userid , "name" : username});
        }
        
    }
}});



   

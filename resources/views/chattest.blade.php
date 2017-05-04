@extends('layouts.app')
@section('content')
    <div class="row">
    <div class="col-md-3">
    <div class="panel panel-primary">
    <div class="panel panel-default">
                <div class="panel-heading">Users</div>
                <div class="panel-body">
                    <ul class="list-group">
                @foreach($users as $chatuser)
                    <li v-on:click="getUserId" class="list-group-item" id="{{ $chatuser->id }}">{{ $chatuser->name }}</li>
                @endforeach
                    
                </ul>
                </div>
            </div>
                 
                {{-- <ul class="list-group">
                @foreach($users as $chatuser)
                    <li v-on:click="getUserId" class="list-group-item" id="{{ $chatuser->id }}">{{ $chatuser->name }}</li>
                @endforeach
                    
                </ul> --}}
            
        
    </div>
    <div class="col-md-5">
        <div class="panel panel-primary">
            <div class="panel-heading" id="accordion">
                <span class="glyphicon glyphicon-comment"></span> Chat
            </div>
        <div class="panel-collapse" id="collapseOne">
            <div class="panel-body">
                <ul class="chat" id="chat">
                    <li class="left clearfix" v-for="(chat,index) in chats" v-bind:message="index.message" v-bind:username="index.username">
                    <span class="chat-img pull-left">
                    <img src="http://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" class="img-circle">
                    </span>
                    <div class="chat-body clearfix">
                    <div class="header">
                    <strong class="primary-font"> @{{chat.name}}</strong> 
                    </div>
                    <p>@{{chat.message}}</p>
                    </div>
                    </li>                                
                </ul>
            </div>
            <div class="panel-footer">
                <div class="input-group">
                    <input v-if="show" id="btn-input" id="message" v-model="chatMessage" v-on:keyup.enter="sendMessage" type="text" class="form-control input-md" :class="{show : disabled}" placeholder="Type your message here..." />
                    <span class="input-group-btn"><button id="btn-chat" class="btn btn-warning btn-md" v-on:click="sendMessage">
                            Send</button></span>
                </div>
            </div>
        </div>
        </div>
    </div>
</div> 
@endsection
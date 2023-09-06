import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer


class AsyncChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope.get('user') and self.scope['user'].is_authenticated:
            self.username = self.scope['user'].username
        else:
            self.username = 'guest'

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')

        await self.channel_layer.group_send(
            self.room_group_name,
            # chat.message calls self.chat_message
            {'type': 'chat.message', 'message': f'{self.username}: {message}'}
        )

    async def chat_message(self, event):
        message = event.get('message')
        await self.send(text_data=json.dumps({'message': message, 'username': self.username}))


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')

        async_to_sync(self.channel_layer.group_send)(
            # chat.message calls self.chat_message
            self.room_group_name, {'type': 'chat.message', 'message': message}
        )

    def chat_message(self, event):
        message = event.get('message')
        self.send(text_data=json.dumps({'message': message}))

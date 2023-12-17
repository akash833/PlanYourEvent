import { io } from 'socket.io-client';


let socket: any = io(process.env.NEXT_PUBLIC_API_PATH!); // 'http://localhost:4000');

socket.on('connect', () => {
  socket.emit("userInfo", "");
  alert('connect');
});

socket.on("users", (msg: any) => {
  console.log(msg);
  alert('users');
});

export default socket;
function generateRandomRoomName() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomName = '';
  for (let i = 0; i < 10; i++) {
    roomName += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return roomName;
}

export default generateRandomRoomName;

interface UserState {}

class User implements UserState {
  constructor() {
    let UserInfoDom = document.querySelector('.user_Info') as InnerHTML;
    const convertToJsonParse = JSON.parse(localStorage.getItem('user'));
    UserInfoDom
      ? (UserInfoDom.innerHTML += `${convertToJsonParse.username}`)
      : null;
  }

  setOnLocalStorage(data: { username: string; id: number }) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      const convertToJsonParse = JSON.parse(localStorage.getItem('user'));
      return convertToJsonParse as any;
    }
  }
}

export default new User();

import { auth, signInWithEmailAndPassword } from "../api/firebase_config.js";
import { user_api } from "../api/firebase_user_api.js";
import { message } from "../module/cart_message.js";

//用戶資料
let user = {
  login_form: {
    email: "",
    password: "",
  },
  signup_form: {
    email: "",
    password: "",
  },
};

let user_data = {
  uid: "",
  email: "",
  role: "",
};

let uid = "";
// 表單驗證規則
// const rules = reactive({
//   email: [
//     { required: true, message: "電子信箱不能為空", trigger: "blur" },
//     {
//       pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
//       message: "請輸入有效的電子信箱",
//       trigger: "blur",
//     },
//   ],
//   password: [
//     { required: true, message: "密碼不能為空", trigger: "blur" },
//     { pattern: /^[A-Za-z]/, message: "密碼必須以英文字母開頭", trigger: "blur" },
//     { min: 6, max: 12, message: "密碼長度應為6到12個字", trigger: "blur" },
//   ],
// });

//表單驗證
// async function form_verify(validate, call_backs) {
//   try {
//     const valid = await validate();
//     if (valid) {
//       ElMessage({
//         message: "輸入驗證成功",
//         type: "success",
//       });
//       call_backs();
//     } else {
//       ElMessage.error("輸入驗證異常！");
//     }
//   } catch (error) {
//     ElMessage.error("輸入驗證不合法！");
//   }
// }

//信箱註冊驗證
async function register_user() {
  async function firebase_register() {
    try {
      let new_user = await createUserWithEmailAndPassword(auth, user.signup_form.email, user.signup_form.password);

      let user_data = {
        uid: new_user.user.uid,
        email: String(user.signup_form.email),
      };

      await user_api.add_user(user_data); //新增使用者
      //   ElMessage.success("註冊成功~~請進行登入");
    } catch (error) {
      console.error("Firebase 註冊錯誤:", error);
      if (error.code === "auth/email-already-in-use") {
        // ElMessage.error("此信箱已被註冊，請使用其他信箱！");
      } else if (error.code === "auth/invalid-email") {
        // ElMessage.error("請輸入有效的電子郵件地址！");
      } else if (error.code === "auth/weak-password") {
        // ElMessage.error("密碼強度不足，請使用更強的密碼！");
      } else {
        // ElMessage.error("註冊時發生錯誤，請稍後再試！");
      }
    }
  }
  //驗證成功後註冊
  //   form_verify(signupForm.value.validate, firebase_register);
}

//登入驗證
async function login_user(user) {
  try {
    await login_process(user.email, user.password);

    message.success("登入成功!");
  } catch (error) {
    message.success("登入失敗! 請確認帳號或密碼是否正確");
    console.error(error);
  }
}

// 登入
async function login_process(email, password) {
  try {
    let auth_user = await signInWithEmailAndPassword(auth, email, password);
    user_data.uid = auth_user.user.uid;
    store_uid_records("uid", user_data.uid);

    await user_api.latest_login_time(user_data.uid);

    await get_user_data();
  } catch (error) {
    throw error;
  }
}

//紀錄登入狀態
function store_uid_records(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//取得用戶資料
async function get_user_data() {
  let data = await user_api.get_user_data(user_data.uid);
  user_data.email = data.email;
  user_data.role = data.role;
}

//合法uid驗證
// verify_uid: async function () {
//   let user_data = await user_api.verify_uid(this.uid);

//   if (user_data) {
//     this.data.email = user_data.email;
//     this.data.role = user_data.role;
//     return true;
//   } else {
//     return false;
//   }

function verify_id() {
  let id = localStorage.getItem("uid");
  if (id) {
    return id;
  } else {
    return false;
  }
}

//登出清除uid紀錄
function logout() {
  localStorage.removeItem("uid");
  window.location.href = "index.html";
}

export { register_user, login_user, user_data, verify_id, logout };

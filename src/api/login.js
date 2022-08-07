import request from "@/utils/request";

//登陆接口
export function login(data) {
  return request({
    url: "/user-service/user/login",
    method: "post",
    data,
  });
}
//获取验证码接口
export function checkInfo(data) {
  return request({
    url: `https://likede2-java.itheima.net/api/user-service/user/imageCode/${data}`,
    method: "get",
    responseType: "arraybuffer",
  });
}
// 获取用户基本信息
export function getUserInfo(id) {
  return request({
    url: "/user-service/user/" + id,
  });
}

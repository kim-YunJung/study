"use strict";

const { response } = require("express");
const UserStorage = require('./UserStorge');

class User {
    //생성자
    constructor(body){
        this.body = body;
    }

    /* promises사용 시 데이터가 반환되는 때까지오래 걸려 async를 이용한다. */
    //메서드
    async login(){
        const client = this.body;
        /*
        동일하다.
        const users = UserStorage.getUsers('id', 'pwd'); 
        const {id, pwd} = UserStorage.getUsers('id', 'pwd'); 
        */
        try {
          const user = await UserStorage.getUserInfo(client.id); 
    
          if (user) {
            if (user.id === client.id && user.pwd === client.pwd) {
              return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
          }
          return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (error) {
          return { success: false, msg: error };
        }
      }

    async register(){
        const client = this.body;
        
        try {
          const response = await UserStorage.save(client);
          return response;
        } catch (error) {
          return {success : false, msg : err};
        }        
    }
}

module.exports = User;

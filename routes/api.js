var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const UserModel = require('../models/users');
const formidable = require('formidable');
const path=require('path')
const saltRounds = 10


router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body
    console.log(req.body)
    UserModel.find({ email })
        .then(resp => {
            if (resp.length) {
                res.json({
                    code: 4002,
                    data: {
                        errMsg: '用户已经存在'
                    }
                })
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, (err, password) => {
                        const newUser = new UserModel({ name, email, password })
                        newUser.save()
                            .then(resp => {
                                res.json({
                                    code: 200,
                                    data: {
                                        errMsg: '注册成功',
                                        userInfo: {
                                            name: resp.name,
                                            email: resp.email,
                                            _id: resp._id
                                        }
                                    }
                                })
                            })
                            .catch(error => {
                                res.json({
                                    code: 4001,
                                    erroMsg: error.message
                                })
                            })
                    })
                })
            }
        })
})

.post('/signin',(req,res,next)=>{
    const { name, email, password } = req.body
    UserModel.find({ email })
    .then(resp=>{
        if(!resp.length){
            res.json({
                code: 4003,
                data:{
                    errMsg:'用户不存在，请注册'
                }
            })
        }else{
            bcrypt.compare(password,resp[0].password,(err,result)=>{
                if(result){
                    req.session.name='user'
                    res.json({
                        code: 200,
                        data:{
                            errMsg:'登陆成功'
                        }
                    })
                }else{
                    res.json({
                        code: 4004,
                        data:{
                            errMsg:'密码错误'
                        }
                    }) 
                }
            })
        }
    })
})

router.post('/upload',(req,res,next)=>{
    const form=new formidable.IncomingForm()
    form.uploadDir=path.join(process.cwd(),'public/uploads')
    form.keepExtensions=true
    form.parse(req,(err,diels,files)=>{
        if(files){
            res.json({
                code:200,
                data:{
                    errMsg:'上传成功',
                    url:'/uploads/'+path.basename(files.avatar.path)
                }
            })
        }
    })
})

module.exports = router;

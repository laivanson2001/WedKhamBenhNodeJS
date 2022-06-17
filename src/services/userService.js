import db from '../models/index'
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)

            if (isExist) {
                let user = await db.User.findOne({
                    where: { email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,


                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = `Ok`
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password!'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User's not found!`
                }

            } else {
                userData.errCode = 1
                userData.errMessage = `Your's email isn't exist in your system. Please try again!`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}



let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email }

            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (id && id !== 'ALL') {
                users = await db.User.findOne({
                    where: { id },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        }
        catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // checkUserEmail isExist
            let check = await checkUserEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Please try another email!'
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.image,
            })
            resolve({
                errCode: 0,
                message: 'OK',
            })
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: id
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exist"
                })
            }
            await db.User.destroy({
                where: id
            })
            resolve({
                errCode: 0,
                message: 'The user is deleted'
            })
        } catch (error) {
            console.log(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'Update the user successds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
}
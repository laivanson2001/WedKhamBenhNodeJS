import db from '../models/index'
import bcrypt from 'bcryptjs'

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

module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
}
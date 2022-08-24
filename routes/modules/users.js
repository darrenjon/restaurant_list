const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true,
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Registration failed! Please complete all the required fields to proceed.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password incorrect! Please make sure your passwords match' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面並回傳填寫資料
    if (user) {
      errors.push({ message: 'An account with this email already exists.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 如果還沒註冊：寫入資料庫
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout Successful. You have been successfully logged out. Please login in again below if you need to make changes or updates to your restaurant list.')
  res.redirect('/users/login')
})

module.exports = router
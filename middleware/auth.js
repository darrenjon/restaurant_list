module.exports = {
  authenticator: (req, res, next) => {
    //根據 request 的登入狀態回傳 true 或 false
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please Login! You need to login to access this page. Please enter your Email and Password and click Login.') 
    res.redirect('/users/login')
  }
}
module.exports = (fn) => (req, res, next) => {
  // async function 回傳 Promise
  // 若 async function 捕捉到 Error 也代表 Promise 會被 reject
  fn(req, res, next).catch(next)
}
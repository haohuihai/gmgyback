class ControlAction {
  test(req, res) {
      res.send({ status: "SUCCESS", msg: "线上测试成功", code: 200 });
  }
}

module.exports = new ControlAction;
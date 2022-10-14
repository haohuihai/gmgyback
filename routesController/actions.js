class ControlAction {
  test(req, res) {
      res.send({ status: "SUCCESS", msg: "文章保存成功", code: 200 });
  }
}

module.exports = new ControlAction;
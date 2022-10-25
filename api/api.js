class API {
    //创建数据
    createData(modelName, o) {
      //modelName: 模型名称，string
      //o: 创建的数据, object
      return Model[modelName].create(o);
    }
  
    //查询数据
    findData(modelName, condition, attributes, orders = []) {
      // modelName: 模型名称, string
      // condition: 查询条件, object
      // attributes: 查询字段, array [字段名1, 字段名1, ...]
      // orders    排序字段  []
      console.log('orders', orders)
      return Model[modelName].findAll({
        attributes,
        where: condition,
        order: orders
      }).then(res => {
        return res
        
      }, err => {
        console.log('err', err)
      });
    }
    //更新数据
    updateData(modelName, values, condition) {
      //modelName: 模型名称, string
      //values: 更新的数据, object
      //condition: 查询条件, object
      return Model[modelName].update(values, {
        where: condition,
      });
    }
  
    //删除数据
    removeData(modelName, condition) {
      //modelName: 模型名称, string
      //condition: 查询条件, object
      return Model[modelName].destroy({
        where: condition,
      });
    }
  
    //查询数据总数量
    count(modelName, condition) {
      //modelName: 模型名称, string
      //condition: 查询条件, object
      return Model[modelName].count({
        where: condition,
      });
    }
  
    // 原始查询
    query(sql, o) {
      return sequelize.query(sql, {
        replacements: o,
        type: sequelize.QueryTypes.SELECT,
      });
    }
    // 关联查询
    association(SModelName, TModelName, SMAttr, TMAttr) {
      return SModelName.BelongsTo(TModelName, {
        foreignKey: SMAttr, // 如果不定义这个，也会自动定义为「目标模型名 + 目标模型主键名」即 user_id
        targetKey: TMAttr, // 目标模型的关联键，默认主键，通常省略
      });
    }
  }
  
  module.exports = new API();
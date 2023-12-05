const { Op } = require('sequelize');
const { Good, Auction, User } = require('../models');

exports.renderMain = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // ?��?�� ?���?
    const goods = await Good.findAll({ 
      where: { SoldId: null, createdAt: { [Op.gte]: yesterday } },
    });
    res.render('main', {
      title: 'NodeAuction',
      goods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderJoin = (req, res) => {
  res.render('join', {
    title: '?��?���??�� - NodeAuction',
  });
};

exports.renderGood = (req, res) => {
  res.render('good', { title: '?��?�� ?���? - NodeAuction' });
};

exports.createGood = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    await Good.create({
      OwnerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderAuction = async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          as: 'Owner',
        },
      }),
      Auction.findAll({
        where: { GoodId: req.params.id },
        include: { model: User },
        order: [['bid', 'ASC']],
      }),
    ]);
    res.render('auction', {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.bid = async (req, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    if (!good) {//?��?��?�� 존재?���? ?��?��) {
      return res.status(404).send("there is no good");//status:404, send:'?��?�� ?��?��??? 존재?���? ?��?��?��?��.'
    }
    if (good.price >= bid) {//bid(?��찰�??�?)?�� ?��?���?격보?�� 같거?�� ?���? ?��찰함) {
      return res.status(403).send("");//status:403, send:'?��?�� �?격보?�� ?���? ?��찰해?�� ?��?��?��.'
    }
    // if (new Data (good.createdAt)) {//?��?��?��각이 ?��찰을 ?��?��?�� ?���? + 24?���? 보다 �??��) {
    //   return res.status(403).send("");//status:403, send:'경매�? ?���? 종료?��?��?��?��?��'
    // }
    // if () {//?��?�� ?��찰�??격보?�� ?��??? ?��찰�??격이 ?��?��?��) {
    //   return res.status(403).send("");//status:403, send:'?��?�� ?��찰�??보다 ?��?��?�� ?��?��?��'
    // }
    const result = await Auction.create({
      bid,
      msg,
      UserId: req.user.id,
      GoodId: req.params.id,
    });
    // ?��?��간으�? ?���? ?��?�� ?��?��
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
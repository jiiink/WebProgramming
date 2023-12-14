const { Op } = require('sequelize');
const { Good, Auction, User, sequelize } = require('../models');
const schedule = require('node-schedule');

exports.renderMain = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
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
    title: '회원가입 - NodeAuction',
  });
};

exports.renderGood = (req, res) => {
  res.render('good', { title: '상품 등록 - NodeAuction' });
};

exports.createGood = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      OwnerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    const end1 = new Date();
    const end2 = new Date();
    end1.setHours(end1.getHours() + 12); // after 12 hours
    console.log(`end : ${end1}`);
    end2.setDate(end2.getDate() + 1); // after a day
    console.log(`end : ${end2}`);

    const job1 = schedule.scheduleJob(end1, async () => {
      const success = await Auction.findOne({
        where: { GoodId: good.id },
        order: [['bid', 'DESC']],
      });

      if (!success) {
        await good.update({
          price: good.price / 2,
        })
      }
    });
    const job2 = schedule.scheduleJob(end2, async () => {
      const success = await Auction.findOne({
        where: { GoodId: good.id },
        order: [['bid', 'DESC']],
      });

      if (success) { // 낙찰자 있음
        await good.setSold(success.UserId);
        await User.update({
          money: sequelize.literal(`money - ${success.bid}`),
        }, {
          where: { id: success.UserId },
        }); 
      } else { // 낙찰자 없음
        await good.setSold(good.OwnerId)
      }
    });
    job2.on('error', (err) => {
      console.error('스케줄링 에러', err);
    });
    job2.on('success', () => {
      console.log('스케줄링 성공');
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
    const lastAuction = await Auction.findOne({
      order: [['id', 'DESC']],
    });
    if (req.user.id === lastAuction.UserId) {
      return res.status(403).send("두번 연속 입찰 할 수 없습니다.");
    }
    if (!good) {
      return res.status(404).send('해당 상품은 존재하지 않습니다.');
    }
    if (bid > req.user.money) {
      return res.status(403).send("입찰 금액이 보유 자산보다 큽니다.");
    }
    if (good.price >= bid) {
      return res.status(403).send('시작 가격보다 높게 입찰해야 합니다.');
    }
    if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
      return res.status(403).send('경매가 이미 종료되었습니다');
    }
    if (good.Auctions[0]?.bid >= bid) {
      return res.status(403).send('이전 입찰가보다 높아야 합니다');
    }
    const result = await Auction.create({
      bid,
      msg,
      UserId: req.user.id,
      GoodId: req.params.id,
    });
    // 실시간으로 입찰 내용 전송
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

exports.renderList = async (req, res, next) => {
  try {
    const goods = await Good.findAll({
      where: { SoldId: req.user.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    });
    res.render('list', { title: '낙찰 목록 - NodeAuction', goods });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
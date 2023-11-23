exports.renderProfile = (req, res) => {
    res.render('profile', { title: 'my info   NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: 'join  NodeBird' });
};

// exports.renderMain = 
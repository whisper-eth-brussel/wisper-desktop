module.exports = (_, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Index',
    includes: {
      css: ['page'],
      js: ['page', 'localhostRequest']
    }
  });
}
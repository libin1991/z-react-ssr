import path from 'path';
import express from 'express';
import compression from 'compression';
import resFavicon from './controller/noFavicon';
import defaultRes from './controller/default';

const port = 3000;
const app = express();
app.use(compression());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));

app.get('/favicon.ico', resFavicon);

/**
 * 测试用接口，可直接删除
 */
app.get('/api/content', (req, res) => {
    console.log(req.url);
    const data = {
        content: 'NODE_ENV=production webpack --config build/webpack.prod.conf.js',
        pic: 'http://p3.pstatp.com/large/666d00001c59a9ece8de',
        arr: [0, 1, 2, 3]
    };
    res.status(200).send(data);
});

app.get('*', defaultRes);

app.listen(port);

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);

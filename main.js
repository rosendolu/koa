import Koa from 'koa';
import http from 'http';
import https from 'https';
const { log } = console;
const app = new Koa();

http.createServer(app.callback()).listen(3001);
https.createServer(app.callback()).listen(3002);
// logger
app.use(async (ctx, next) => {
	log(JSON.stringify(ctx.app));
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
	ctx.body = 'Hello World';
});

app.listen(3000);

import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaRouter from 'koa-router';
const router = koaRouter();
const { log } = console;
const app = new Koa();

// logger
app.use(async (ctx, next) => {
	await next();
});
router.get('/home', async (ctx) => {
	ctx.response.body = `<h1>home ${JSON.stringify(ctx.request.url)}</h1>`;
});
router.get('/', async (ctx) => {
	ctx.response.body = '<h1>index</h1>';
});
router.post('/update', async (ctx, next) => {
	log('user', ctx.request);
	// if (name === 'koa' && password === '12345') {
	// 	ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
	// } else {
	// 	ctx.response.body = `<h1>Login failed!</h1>
	// <p><a href="/">Try again</a></p>`;
	// }
});
app.use(koaBodyparser());
app.use(router.routes());
app.listen(3000, () => {
	log('Server running at:http://localhost:3000');
});

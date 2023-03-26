/**
 * クリックすると音符が放物線を描きながら飛び出す実装
 */


// 


document.querySelector('.cello').animate(
	[
		{
			offset: 0.00,
			transform: 'translate(0, 0)'
		},
		{
			offset: 0.02,
			transform: 'rotate(0.01turn)'
		},
		{
			offset: 0.04,
			transform: 'rotate(-0.01turn)'
		},
		{
			offset: 0.06,
			transform: 'rotate(0.01turn)'
		},
		{
			offset: 0.10,
			transform: 'translate(0, 0)'
		},
		{
			offset: 1.00,
			transform: 'translate(0, 0)'
		}
	],
	{
		duration: 8000,
		iterations: Infinity
	}
);


/*
* ひょっこり音符
*/
document.querySelector('.note').animate(
	[
		{
			offset: 0.00,
			transform: 'translate(0, 0)'
		},
		{
			offset: 0.10,
			transform: 'translate(-100%, 0)'
		},
        {
			offset: 0.14,
			transform: 'translate(-100%, 0%)'
		},
        {
			offset: 0.15,
			transform: 'translate(-100%, -10%)'
		},
        {
			offset: 0.16,
			transform: 'translate(-100%, 0%)'
		},
        {
			offset: 0.17,
			transform: 'translate(-100%, -10%)'
		},
        {
			offset: 0.18,
			transform: 'translate(-100%, 0%)'
		},
        {
			offset: 0.50,
			transform: 'translate(-100%, 0)'
		},
		{
			offset: 0.60,
			transform: 'translate(0, 0)'
		},
	],
	{
		duration: 12000,
		iterations: Infinity
	}
);


/**
 * 走る犬
 */
document.querySelector('.inu').animate(
	[
		{
			offset: 0.10,
			transform: 'translate(0, 0)'
		},
    {
			offset: 0.20,
			transform: 'translate(-1300px, 0)'
		},
		{
			offset: 0.25,
			transform: 'translate(-650px, 0)'
		},
    {
			offset: 0.26,
			transform: 'translate(-645px, 0)'
		},
    {
			offset: 0.27,
			transform: 'translate(-655px, 0)'
		},
    {
			offset: 0.28,
			transform: 'translate(-645px, 0)'
		},
    {
			offset: 0.29,
			transform: 'translate(-655px, 0)'
		},
    {
			offset: 0.30,
			transform: 'translate(-650px, 0)'
		},
    {
			offset: 0.35,
			transform: 'translate(0, 0)'
		},
	],
	{
		duration: 20000,
		iterations: Infinity
	}
);



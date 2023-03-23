"use strict";

//==========
// Matter.js

// var stage = document.createElement(canvas);
// var ctx;

//   ctx = stage.getContext('2d');

//   stage.width = 600;
//   stage.height = 600;

//   ctx.strokeRect(300, 300, 100, 60);

// canvas size
const WIDTH  = 700;
const HEIGHT = 700;

const imagePath =["./2.note.png","2note.png","4note.png","8kyusi.png","8note.png", "16note.png","henote.png","tonote.png"];

// set matter.js modules 
const Engine     = Matter.Engine;
const Render     = Matter.Render;
const Runner     = Matter.Runner;
const Body       = Matter.Body;
const Bodies     = Matter.Bodies;
const Bounds     = Matter.Bounds;
const Common     = Matter.Common;
const Composite  = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Events     = Matter.Events;
const Mouse      = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

window.onload = ()=>{

// ----------------- Setting ---------------------
	const engine = Engine.create();
	engine.gravity.scale = 0.0003;

	// 2, 画面を描画するクラス
	const render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: WIDTH, height: HEIGHT,
			showAngleIndicator: true,
			showCollisions: false,
			showDebug: false,
			showIds: false,
			showVelocity: false,
			hasBounds: true,
			wireframes: false,// Important!!
			background: 'transparent',
		},

	});
	Render.run(render);

//--------------------- object ---------------------------

	// 地面
	const ground = Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, 50, 
		{isStatic: true,
		fillStyle:"white"});
	Composite.add(engine.world,  ground);

    // create note composite( =>Event, create note when 'mousedown') 
    const ballComposite = Composite.create();
    Composite.add(engine.world, ballComposite);


//----------------Event---------------------
    //マウスカーソルの設定
    const mouse = Mouse.create(render.canvas);
	render.mouse = mouse;
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {visible: false}
		}
	});

    Events.on(mouseConstraint, 'mousedown', e => {
        // ドラッグ中の処理
        if (mouseConstraint.body) { return }
        
		// create note
        const metor = Math.random();
        const width = (1+metor) * 25;
        const height = (1+metor) * 25 + 10;
        const ball = Bodies.rectangle(100, 200, width, height, { 
            restitution: 0.5 ,
			chamfer: {radius: 12},
            render: {
				strokeStyle: "#ffffff",
				sprite: {texture: './images/note_'+Math.floor(metor * 8 + 1)+'.png',
						xScale:(metor+1) * 0.05,
						yScale:(metor+1) * 0.05
				}
			}
        });
		console.log(metor*8+1);
		Body.setVelocity(ball, {x: (Math.random()+1)*3,y: -(Math.random()+1)*4});
        Composite.add(ballComposite, ball);
    });

	Composite.add(engine.world, mouseConstraint);
	Events.on(engine, 'collisionStart', e => {
		$.each(e.pairs, (i, pair) => {
		  // 
			if (pair.bodyA.label === 'bagTop') {
				Composite.remove(ballComposite, pair.bodyB);
			}
		})
	});

    function createBag(x,y,w,h){
		//set obejct that bag object stored
		const group = Body.nextGroup(true);
		const bag = Composite.create({label: "bag"});

		//bag
		const body = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {group: group},
			chamfer: {radius: h*0.5},
			isStatic: true,
			render: {
				sprite:{texture: './images/bag.png'},
			}
		});

		//bag at top
		const top = Bodies.renctangle(x, y, w, h, {
			collisionFillter: {group: group},
			label: 'bagTop'
		});

		const jointBag = Constraint.create({
			bodyA: body,
			bodyB: top,
			pointB: {x: 100, y: 0},
			stiffness: 1,
			length: 0
		})

		Composite.addBody(bag, body);
		Composite.addBody(bag, bagTop);
		Composite.addConstraint(bag, jointBag);
		Composite.add(engine.world, bag);
    }
    
    
	// 4, 物理世界を更新します
	const runner = Runner.create();
	Runner.run(runner, engine);
}
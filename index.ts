import p5 from 'p5';
import {
	BooleanController,
	ColorController,
	HiroApp,
	HiroAppOptions,
	NumberController,
	TextController,
} from '@hiro-sdk/core';

const w= 800;
const h= 800;

const app = new HiroApp({
	title: 'P5js Ex 3',
	author: '#f57e56',
	description: 'Some description or instructions about your artwork.',
});

app.bootstrap();

const bgColor = new ColorController('#FFF', 'bg-color',{
	label: 'BG Color'
});

const padding = new NumberController(10, 'padding', {
	label: 'Padding',
	max: 50,
	min: 0,
	step: 5,
	slider: true,
});

const numSquares = new NumberController(30,'slider-Gw2hv', {
	label: 'Number of Squares',
	max: 30,
	min: 2,
	step: 1,
	slider: true,
});

const maxSize = new NumberController((w*0.9),'max-size', {
	label: 'Max Size',
	max: w - padding.getValue() * 2,
	min: 10,
	step: 10,
	slider: true,
});

const spacing = new NumberController(20, "space", {
	label: "Spacing between squares",
	max: maxSize.getValue() / numSquares.getValue(),
	min: 10,
	step: 5,
	slider: true,
});


const mouseEnabled = new BooleanController(false, 'mouse-enabled', {
	label: 'Mouse Enabled',
});

let sketch = (p) => {

	p.setup = () => {
		p.createCanvas(w, h);
		p.noFill();
		p.colorMode(p.HSB, 360, 100, 100, 1);
		p.rectMode(p.CENTER);
	};

	p.draw = () => {
		p.background(bgColor.getValue());

		let center = {
			x: w/2,
			y: h/2
		};

		for (let i = 0; i < numSquares.getValue(); i++) {
			let size = maxSize.getValue() - i * spacing.getValue();
			let offset = p.sin(p.frameCount * 0.02 + i)*50;
			let hue = (p.frameCount + offset) % 360;

			let normDx = mouseEnabled.getValue()? (p.mouseX - center.x) * i / (size / 2): 0;
			let normDy = mouseEnabled.getValue()? (p.mouseY - center.y) * i / (size / 2): 0;


			p.stroke(hue, 80, 100);
			p.fill(hue, 80, 100, 0.5);
			p.shadowEffect(
				center.x+normDx,
				center.y+normDy,
				size
			);

			p.rect(
				center.x+normDx,
				center.y+normDy,
				size + offset,
				size + offset,
				25
			);
		}
	};

	p.shadowEffect = (x, y, size) => {
		p.drawingContext.shadowOffsetX = 5;
		p.drawingContext.shadowOffsetY = 5;
		p.drawingContext.shadowBlur = 10;
		p.drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
		// Reset shadow after drawing
		p.rect(x, y, size, size, 20);
		p.drawingContext.shadowColor = 'rgba(0,0,0,0)';
	};
};

new p5(sketch);


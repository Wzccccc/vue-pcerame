<template>
	<div class="s-canvas">
		<canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
	</div>
</template>
<script setup lang="ts" name="SIdentify">
import { watch, onMounted, nextTick } from "vue";
const props = defineProps({
	identifyCode: {
		type: String,
		required: true
	},
	fontSizeMin: {
		type: Number,
		default: 25
	},
	fontSizeMax: {
		type: Number,
		default: 25
	},
	backgroundColorMin: {
		type: Number,
		default: 180
	},
	backgroundColorMax: {
		type: Number,
		default: 240
	},
	colorMin: {
		type: Number,
		default: 50
	},
	colorMax: {
		type: Number,
		default: 160
	},
	lineColorMin: {
		type: Number,
		default: 100
	},
	lineColorMax: {
		type: Number,
		default: 200
	},
	dotColorMin: {
		type: Number,
		default: 0
	},
	dotColorMax: {
		type: Number,
		default: 255
	},
	contentWidth: {
		type: Number,
		default: 150
	},
	contentHeight: {
		type: Number,
		default: 40
	}
});
// 生成一个随机数
const randomNum = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};
// 生成一个随机的颜色
const randomColor = (min: number, max: number) => {
	let r = randomNum(min, max);
	let g = randomNum(min, max);
	let b = randomNum(min, max);
	return "rgb(" + r + "," + g + "," + b + ")";
};
const transparent = () => {
	return "rgb(255,255,255)";
};

function drawPic() {
	let canvas = document.getElementById("s-canvas") as HTMLCanvasElement | null;
	let ctx = canvas!.getContext("2d");
	ctx!.textBaseline = "bottom";
	//   绘制背景
	ctx!.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
	ctx!.fillStyle = transparent();
	ctx!.fillRect(0, 0, props.contentWidth, props.contentHeight);
	// 绘制文字
	for (let i = 0; i < props.identifyCode.length; i++) {
		drawText(ctx, props.identifyCode[i], i);
	}
	//绘制背景
	drawLine(ctx);
	drawDot(ctx);
}
function drawText(ctx: CanvasRenderingContext2D | null, txt: string, i: number) {
	ctx!.fillStyle = randomColor(props.colorMin, props.colorMax);
	ctx!.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei";
	let x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1));
	let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
	var deg = randomNum(-10, 10);
	// 修改坐标原点和旋转角度
	ctx!.translate(x, y);
	ctx!.rotate((deg * Math.PI) / 180);
	ctx!.fillText(txt, 0, 0);
	// 恢复坐标原点和旋转角度
	ctx!.rotate((-deg * Math.PI) / 180);
	ctx!.translate(-x, -y);
}
function drawLine(ctx: CanvasRenderingContext2D | null) {
	// 绘制干扰线
	for (let i = 0; i < 8; i++) {
		ctx!.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
		ctx!.beginPath();
		ctx!.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx!.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx!.stroke();
	}
}
function drawDot(ctx: CanvasRenderingContext2D | null) {
	// 绘制干扰点
	for (let i = 0; i < 100; i++) {
		ctx!.fillStyle = randomColor(0, 255);
		ctx!.beginPath();
		ctx!.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI);
		ctx!.fill();
	}
}
watch(
	() => props.identifyCode,
	val => {
		nextTick(() => {
			drawPic();
		});
	},
	{ immediate: true }
);
onMounted(() => {
	nextTick(() => {
		drawPic();
	});
});
</script>
<style lang="scss">
.s-canvas {
	height: 100%;
}
</style>

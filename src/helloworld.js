// 必须要webserver渲染
import {Application, Assets, Sprite} from 'pixi.js'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
// 创建应用
const app = new Application({
  width: 300,
  height: 300,
})

// The application will create a canvas element for you that you
// can then insert into the DOM
// 插入dom
document.body.appendChild(app.view)

// load the texture we need
// 通过Assets.load() 加载图片资源
// const texture = await Assets.load('./public/images/pixijs-logo.png')
// 异步
const texture = await Assets.load('./public/images/cat.png')

// This creates a texture from a 'bunny.png' image
// 根据图片资源创建纹理
// const bunny = new Sprite(texture)
const bunny = Sprite.from('./public/images/cat.png')

// Setup the position of the bunny
// bunny.x = app.renderer.width / 2
// bunny.y = app.renderer.height / 2
// 没有旋转时 x,y 为左上角
bunny.x = 0
bunny.y = 0

// Rotate around the center
// 类似css中的transform-origin
bunny.anchor.x = 0.5
bunny.anchor.y = 0.5

// Add the bunny to the scene we are building
app.stage.addChild(bunny)
// Listen for frame updates
// 类似requestAnimationFrame
let direction = 'right'
// 每一帧都可以加多个动画
app.ticker.add((x) => {
  // 位移
  if (bunny.x > 300 - 64) direction = 'left'
  if (bunny.x < 64) direction = 'right'
  if (direction === 'right') {
    bunny.x += 1
    bunny.y += 1
  }
  if (direction === 'left') {
    bunny.x -= 1
    bunny.y -= 1
  }
})
app.ticker.add(() => {
  // 旋转
  // each frame we spin the bunny around a bit
  bunny.rotation += 0.01
})

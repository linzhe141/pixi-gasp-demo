import {Application, Container, Texture, Sprite} from 'pixi.js'
const app = new Application()
document.body.appendChild(app.view)
// 类似组件可以封装
const ContainerWrap = () => {
  const container = new Container()
  const texture = Texture.from('../../public/images/blob.png')
  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture)
    bunny.anchor.set(0.5)
    bunny.x = (i % 5) * 40
    bunny.y = Math.floor(i / 5) * 40
    container.addChild(bunny)
  }

  return container
}

const container1 = ContainerWrap()
const container2 = ContainerWrap()
container2.position.set(200, 200)
app.stage.addChild(container1)
app.stage.addChild(container2)

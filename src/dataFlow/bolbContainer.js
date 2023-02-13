import {Sprite, Container, Assets} from 'pixi.js'
import gsap from 'gsap'

export class BolbContainer {
  async init(nodes) {
    const container = new Container()
    container.zIndex = 2
    const texture = await Assets.load('images/blob.png')
    nodes = this.setNodeListCoords(nodes, {
      xCenter: 250,
      yCenter: 250,
      radius: 100,
    })
    nodes.forEach((item) => {
      const sprite = new Sprite(texture)
      sprite.pivot.set(15, 12)
      sprite.position.set(item.x, item.y)
      // const tl = gsap.timeline()
      // tl.to(sprite, {repeat: -1, rotation: -360})
      // tl.timeScale(0.0001)
      // rotation 单位是弧度
      gsap.to(sprite, {rotation: -2 * Math.PI, duration: 600, repeat: -1})
      container.addChild(sprite)
    })
    this.nodes = nodes
    // 旋转放大的锚点
    container.pivot.set(250, 250)
    container.position.set(250, 250)
    gsap.to(container, {rotation: 2 * Math.PI, duration: 600, repeat: -1})

    return {
      container,
      nodes: nodes,
    }
  }
  setNodeListCoords(list, {xCenter, yCenter, radius}) {
    const length = list.length
    for (let i = 0; i < length; i++) {
      const item = list[i]
      // α起始边是y轴
      // sinα = x / r
      // cosα = y / r
      // α = 2π / length * i
      const x = radius * Math.sin((2 * Math.PI * i) / length)
      const y = radius * Math.cos((2 * Math.PI * i) / length)
      item.x = Number(x.toFixed(2)) + xCenter
      item.y = Number(y.toFixed(2)) + yCenter
    }
    return list
  }
}

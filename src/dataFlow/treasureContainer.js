import {Sprite, Container, Assets, Graphics} from 'pixi.js'
import gsap from 'gsap'

export class TreasureContainer {
  async init(nodes) {
    const container = new Container()
    container.zIndex = 2
    const texture = await Assets.load('svg/planet1.svg')
    nodes = this.setNodeListCoords(nodes, {
      xCenter: window.innerWidth / 2,
      yCenter: window.innerHeight / 2,
      radius: 320,
    })
    nodes.forEach((item) => {
      const circle = new Graphics()
      circle.lineStyle(0)
      circle.beginFill(0x67e000, 1)
      circle.drawCircle(item.x, item.y, 30)
      circle.endFill()
      circle.pivot.set(item.x, item.y)
      circle.position.set(item.x, item.y)
      circle.scale.x = circle.scale.y = 0.8
      circle.alpha = 0.5
      gsap.to(circle.scale, {duration: 1, x: 1.3, y: 1.3, repeat: -1})
      gsap.to(circle, {duration: 1, alpha: 0, repeat: -1})
      const sprite = new Sprite(texture)
      sprite.pivot.set(25, 25)
      sprite.position.set(item.x, item.y)
      // const tl = gsap.timeline()
      // tl.to(sprite, {repeat: -1, rotation: -360})
      // tl.timeScale(0.0001)
      // rotation 单位是弧度
      gsap.to(sprite, {
        rotation: -2 * Math.PI,
        duration: 600,
        ease: 'none',
        repeat: -1,
      })
      container.addChild(circle)
      container.addChild(sprite)
    })
    this.nodes = nodes
    // 旋转放大的锚点
    container.pivot.set(window.innerWidth / 2, window.innerHeight / 2)
    container.position.set(window.innerWidth / 2, window.innerHeight / 2)
    gsap.to(container, {
      rotation: 2 * Math.PI,
      duration: 600,
      ease: 'none',
      repeat: -1,
    })
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

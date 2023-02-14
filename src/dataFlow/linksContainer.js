import {Container, Graphics, Sprite, Assets} from 'pixi.js'
import gsap from 'gsap'

export class LinksContainer {
  async init(links) {
    const container = new Container()
    const texture = await Assets.load('images/meteor1.png')
    container.zIndex = 1
    for (let i = 0; i < links.length; i++) {
      const item = links[i]
      const sprite = new Sprite(texture)
      sprite.pivot.set(375, 375)
      console.log(item.source.rotation)
      sprite.rotation = -Math.PI / 4 - item.source.rotation
      // sprite.scale.set(0.025)
      sprite.scale.set(0.025)
      const line = new Graphics()
      const value = {
        x: item.source.x,
        y: item.source.y,
      }
      gsap.to(sprite.position, {
        x: item.target.x,
        y: item.target.y,
        duration: 2,
        repeat: -1,
        onUpdate: () => {
          sprite.position.set(value.x, value.y)
        },
      })
      gsap.to(value, {
        x: item.target.x,
        y: item.target.y,
        duration: 2,
        repeat: -1,
        onUpdate: () => {
          line.clear()
          line.lineStyle(1, 0x4fc1ff, 0.7)
          line.moveTo(item.source.x, item.source.y)
          line.lineTo(value.x, value.y)
          // line.closePath()
        },
      })
      // container.addChild(line)
      container.addChild(sprite)
    }
    return {container, links}
  }
}

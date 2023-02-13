import {Container, Graphics} from 'pixi.js'
import gsap from 'gsap'

export class LinksContainer {
  init(links) {
    const container = new Container()
    container.zIndex = 3
    for (let i = 0; i < links.length; i++) {
      const item = links[i]
      const line = new Graphics()
      const value = {
        x: item.source.x,
        y: item.source.y,
      }
      gsap.to(value, {
        x: item.target.x,
        y: item.target.y,
        duration: 2,
        repeat: -1,
        onUpdate: () => {
          line.clear()
          line.lineStyle(1, 0x4fc1ff)
          line.moveTo(item.source.x, item.source.y)
          line.lineTo(value.x, value.y)
          // line.closePath()
        },
      })
      container.addChild(line)
    }
    container.pivot.set(250, 250)
    container.position.set(250, 250)
    gsap.to(container, {rotation: 2 * Math.PI, duration: 600, repeat: -1})

    return {container, links}
  }
}

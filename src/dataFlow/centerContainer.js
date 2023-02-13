import {Sprite, Container, Assets, Texture} from 'pixi.js'

export class CenterContainer {
  async init() {
    const container = new Container()
    container.zIndex = 2
    const texture = await Assets.load('svg/planet3.svg')
    // const texture = Texture.from('svg/planet.svg')
    const sprite = new Sprite(texture)
    sprite.pivot.set(50, 50)
    sprite.position.set(window.innerWidth / 2, window.innerHeight / 2)
    container.addChild(sprite)
    return {
      container,
    }
  }
}

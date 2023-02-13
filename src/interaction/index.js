import {Application, Sprite, settings, SCALE_MODES} from 'pixi.js'
/* 

首先，PixiJS 中的事件不会“冒泡”，这意味着您不能在父对象上设置事件触发器并在单击子对象时触发它。如果要支持冒泡，则需要在子对象的事件处理代码中显式地重新触发父对象的事件。

其次，没有事件捕获支持——例如，您不能让单个对象在拖动时捕获所有交互事件。
*/

const app = new Application()
document.body.appendChild(app.view)
// Scale mode for all textures, will retain pixelation
settings.SCALE_MODE = SCALE_MODES.NEAREST
const sprite = Sprite.from('../../public/images/cat.png')
sprite.interactive = true
sprite.on('pointerdown', () => {
  console.log('pointerdown')
  sprite.scale.x *= 1.25
  sprite.scale.y *= 1.25
})
app.stage.addChild(sprite)

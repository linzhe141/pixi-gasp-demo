import {Text, Container, Graphics, Texture} from 'pixi.js'

export class Tooltip {
  constructor(canvas) {
    this.canvas = canvas
    this.container = new Container()
    this.container.zIndex = 1000
    this.container.visible = false
    this.maxWidth = 300
    this.padding = 6
    this.margin = 15
    this.linesMargin = 4
    this.w = 0
    this.h = 0
  }

  update = (x, y) => {
    x += this.margin
    if (x + this.w > this.canvas.width - this.margin) {
      x -= this.w + this.margin * 2
    }
    if (y + this.h > this.canvas.height - this.margin) {
      y -= this.h + this.margin
    }
    this.container.x = x
    this.container.y = y
  }
  render = (lines) => {
    this.container.removeChildren()
    var height = 0
    var width = 0
    var texts = []
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i]
      var t = new Text(l.t, {
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: l.b ? 'bold' : 'normal',
        fill: l.c,
        wordWrap: true,
        wordWrapWidth: this.maxWidth,
      })
      t.x = this.padding
      t.y = this.padding + height
      height += t.height + this.linesMargin
      if (width < t.width) width = t.width
      texts.push(t)
    }
    height -= this.linesMargin
    if (height < 0) height = 0
    this.w = width
    this.h = height
    var rect = new Graphics()
    // force canvas rendering for rectangle
    rect.cacheAsBitmap = true
    rect.lineStyle(2, 0xee6600, 0.6)
    rect.beginFill(0xffffff, 0.8)
    rect.drawRoundedRect(
      0,
      0,
      width + this.padding * 2,
      height + this.padding * 2,
      6
    )
    rect.endFill()
    this.container.addChild(rect)
    for (var i = 0; i < texts.length; i++) {
      this.container.addChild(texts[i])
    }
  }
  update = (x, y) => {
    x += this.margin
    if (x + this.w > this.canvas.width - this.margin) {
      x -= this.w + this.margin * 2
    }
    if (y + this.h > this.canvas.height - this.margin) {
      y -= this.h + this.margin
    }
    this.container.x = x
    this.container.y = y
  }
}

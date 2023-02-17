import gsap from 'gsap'
import {Application} from 'pixi.js'
import {Tooltip} from './Tooltip'
import {CenterContainer} from './centerContainer'
import {InsideCircleContainer} from './insideCircleContainer'
import {LinksContainer} from './linksContainer'
import {OutsideCircleContainer} from './outsideCircleContainer'
export class DataFlowGraph {
  constructor(insideNodes, outsideNodes, links) {
    this.insideNodes = insideNodes
    this.outsideNodes = outsideNodes
    this.links = links
    this.init()
  }
  async init() {
    const app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      background: 0xffffff,
    })
    this.app = app
    document.body.appendChild(app.view)

    const tp = new Tooltip(app.view)
    tp.render([
      {t: 'New Tooltip', c: '#000', b: true},
      {t: 'Parameter 1', c: '#999', b: false},
      {t: 'GaGa level 18', c: '#a0a', b: true},
      {
        t: 'Long line example test test test test test test test test test test test',
        c: '#44a',
        b: false,
      },
      {t: 'User controlled', c: '#0a0', b: false},
    ])
    gsap.to(tp.container, {
      rotation: -2 * Math.PI,
      duration: 600,
      ease: 'none',
      repeat: -1,
    })
    const {container: insideContainer, nodes: insideNodesDetail} =
      await new InsideCircleContainer().init(this.insideNodes, tp, app.view)
    this.insideContainer = insideContainer
    this.insideNodesDetail = insideNodesDetail

    const {container: outsideContainer, nodes: outsideNodesDetail} =
      await new OutsideCircleContainer().init(this.outsideNodes)
    this.outsideContainer = outsideContainer
    this.outsideNodesDetail = outsideNodesDetail

    const {container: centerContainer} = await new CenterContainer().init()
    this.centerContainer = centerContainer
    const links = setLinksCoords(
      [...insideNodesDetail, ...outsideNodesDetail],
      this.links
    )
    const {container: linksContainer, links: linksDetail} =
      await new LinksContainer().init(links)
    this.linksContainer = linksContainer

    app.stage.sortChildren = true
    app.stage.addChild(tp.container)
    app.stage.addChild(insideContainer)
    app.stage.addChild(outsideContainer)
    app.stage.addChild(centerContainer)
    app.stage.addChild(linksContainer)
    app.stage.children.sort((a, b) => a.zIndex - b.zIndex)
    app.stage.pivot.set(window.innerWidth / 2, window.innerHeight / 2)
    app.stage.position.set(window.innerWidth / 2, window.innerHeight / 2)
    gsap.to(app.stage, {
      rotation: 2 * Math.PI,
      duration: 600,
      ease: 'none',
      repeat: -1,
    })
  }
  async updata(links) {
    const app = this.app
    app.stage.removeChild(this.linksContainer)
    const linksDetail = setLinksCoords(
      [...this.insideNodesDetail, ...this.outsideNodesDetail],
      links
    )
    const {container: linksContainer /*, links: links1 */} =
      await new LinksContainer().init(linksDetail)
    app.stage.addChild(linksContainer)
    app.stage.children.sort((a, b) => a.zIndex - b.zIndex)
  }
}

function setLinksCoords(nodes, links) {
  for (let i = 0; i < links.length; i++) {
    const item = links[i]
    const sourceNode = nodes.find((el) => el.name === item.source.name)
    item.source.x = sourceNode.x
    item.source.y = sourceNode.y

    const targetNode = nodes.find((el) => el.name === item.target.name)
    item.target.x = targetNode.x
    item.target.y = targetNode.y
    const v1 = {x: 0, y: 1}
    const v2 = {
      x: item.target.x - item.source.x,
      y: item.target.y - item.source.y,
    }
    item.source.rotation = get2VectorRadian(v1, v2)
  }
  return links
}

/**
 * v1为起始边，
 * v2为目标边
 * 以v1开始按照逆时针到v2
 * 得到这个θ
 */
function get2VectorRadian(v1, v2) {
  let angle = Math.atan2(v2.x * v1.y - v2.y * v1.x, v2.x * v1.x + v2.y * v1.y)
  if (angle < 0) {
    angle += Math.PI * 2
  }
  return angle
}

import {Application, Sprite, Container, Assets} from 'pixi.js'
import gsap from 'gsap'
import {BolbContainer} from './bolbContainer'
import {TreasureContainer} from './treasureContainer'
import {LinksContainer} from './linksContainer'
import {CenterContainer} from './centerContainer'
import {Tooltip} from './Tooltip'

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0xffffff,
})
document.body.appendChild(app.view)

let boldNodes = [
  {name: '1', x: 0, y: 0},
  {name: '2', x: 0, y: 0},
  {name: '3', x: 0, y: 0},
  {name: '4', x: 0, y: 0},
  {name: '5', x: 0, y: 0},
  {name: '6', x: 0, y: 0},
  {name: '7', x: 0, y: 0},
  {name: '8', x: 0, y: 0},
  {name: '9', x: 0, y: 0},
  {name: '10', x: 0, y: 0},
]
let treasureNodes = [
  {name: '11', x: 0, y: 0},
  {name: '12', x: 0, y: 0},
  {name: '13', x: 0, y: 0},
  {name: '14', x: 0, y: 0},
  {name: '15', x: 0, y: 0},
  {name: '16', x: 0, y: 0},
  {name: '17', x: 0, y: 0},
  {name: '18', x: 0, y: 0},
  {name: '19', x: 0, y: 0},
  {name: '20', x: 0, y: 0},
]
let links = [
  {source: {name: '1', x: 0, y: 0}, target: {name: '11', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '15', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '20', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '19', x: 0, y: 0}},
  {source: {name: '1', x: 0, y: 0}, target: {name: '16', x: 0, y: 0}},
  {source: {name: '13', x: 0, y: 0}, target: {name: '3', x: 0, y: 0}},
]

const tp = new Tooltip(app.view)
app.stage.addChild(tp.container)
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

const {container: bolbContainer, nodes: blobNodes1} =
  await new BolbContainer().init(boldNodes, tp, app.view)
const {container: treasureContainer, nodes: treasureNodes1} =
  await new TreasureContainer().init(treasureNodes)
const {container: centerContainer} = await new CenterContainer().init()
links = setLinksCoords([...blobNodes1, ...treasureNodes1], links)
const {container: linksContainer, links: links1} =
  await new LinksContainer().init(links)

console.log(links)

app.stage.sortChildren = true
app.stage.addChild(bolbContainer)
app.stage.addChild(treasureContainer)
app.stage.addChild(centerContainer)
app.stage.addChild(linksContainer)
app.stage.children.sort((a, b) => a.zIndex - b.zIndex)
console.log(blobNodes1)
console.log(treasureNodes1)
console.log(app.stage.children)

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
    const flag = 1
    console.log('xxxxxxx', item.target, get2VectorRadian(v1, v2))
    // // 通过个数判断
    // if (i > links.length / 2) {
    //   item.source.rotation = 2 * Math.PI - get2VectorRadian(v1, v2)
    // } else {
    item.source.rotation = get2VectorRadian(v1, v2)
    // }
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

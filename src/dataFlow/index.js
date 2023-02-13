import {Application, Sprite, Container, Assets} from 'pixi.js'
import gsap from 'gsap'
import {BolbContainer} from './bolbContainer'
import {TreasureContainer} from './treasureContainer'
import {LinksContainer} from './linksContainer'

const app = new Application({
  width: 500,
  height: 500,
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
  {source: {name: '2', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
  {source: {name: '3', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
]

const {container: bolbContainer, nodes: blobNodes1} =
  await new BolbContainer().init(boldNodes)
const {container: treasureContainer, nodes: treasureNodes1} =
  await new TreasureContainer().init(treasureNodes)
links = setLinksCoords([...blobNodes1, ...treasureNodes1], links)
const {container: linksContainer, links: links1} = new LinksContainer().init(
  links
)

console.log(links)
function setLinksCoords(nodes, links) {
  for (let i = 0; i < links.length; i++) {
    const item = links[i]
    const sourceNode = nodes.find((el) => el.name === item.source.name)
    item.source.x = sourceNode.x
    item.source.y = sourceNode.y

    const targetNode = nodes.find((el) => el.name === item.target.name)
    item.target.x = targetNode.x
    item.target.y = targetNode.y
  }
  return links
}
const container = new Container()
container.sortChildren = true
container.addChild(linksContainer)
container.addChild(bolbContainer)
container.addChild(treasureContainer)
app.stage.addChild(container)
// app.stage.addChild(bolbContainer)
// app.stage.addChild(treasureContainer)
// app.stage.addChild(linksContainer)
console.log(blobNodes1)
console.log(treasureNodes1)

import {DataFlowGraph} from './dataFlowGraph'
import * as PIXI from 'pixi.js'
window.PIXI = PIXI
let insideNodes = [
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
let outsideNodes = [
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
  // {source: {name: '1', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
  // {source: {name: '1', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
  // {source: {name: '1', x: 0, y: 0}, target: {name: '15', x: 0, y: 0}},
  // {source: {name: '1', x: 0, y: 0}, target: {name: '20', x: 0, y: 0}},
  // {source: {name: '1', x: 0, y: 0}, target: {name: '19', x: 0, y: 0}},
  // {source: {name: '1', x: 0, y: 0}, target: {name: '16', x: 0, y: 0}},
  // {source: {name: '13', x: 0, y: 0}, target: {name: '3', x: 0, y: 0}},
]
const dataFlowGraph = new DataFlowGraph(insideNodes, outsideNodes, links)
setTimeout(() => {
  links = [
    {source: {name: '1', x: 0, y: 0}, target: {name: '11', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
  ]
  dataFlowGraph.updata(links)
}, 10 * 1000)
setTimeout(() => {
  links = [
    {source: {name: '1', x: 0, y: 0}, target: {name: '11', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '15', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '20', x: 0, y: 0}},
  ]
  dataFlowGraph.updata(links)
}, 20 * 1000)
setTimeout(() => {
  links = [
    {source: {name: '1', x: 0, y: 0}, target: {name: '11', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '12', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '13', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '15', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '20', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '19', x: 0, y: 0}},
    {source: {name: '1', x: 0, y: 0}, target: {name: '16', x: 0, y: 0}},
    {source: {name: '13', x: 0, y: 0}, target: {name: '3', x: 0, y: 0}},
  ]
  dataFlowGraph.updata(links)
}, 30 * 1000)

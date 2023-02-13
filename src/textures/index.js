// 纹理表示用于填充屏幕区域的像素源。
// 最简单的例子是精灵——一个完全由单一纹理填充的矩形
// PIXI.Texture.from() 它适用于快速演示
// 生产中应使用Loader
// Loader 包装和管理使用<IMG>元素告诉浏览器获取图像，
// 然后在完成时通知您。这个过程是异步的——您请求加载，
// 然后时间过去，然后触发一个事件让您知道加载已完成
// BaseTexture 会自动缓存，
//因此重复调用PIXI.Texture.from()同一 URL 每次都会返回相同的 BaseTexture。
// 销毁 BaseTexture 会释放与其关联的图像数据。
// Source Image > Loader > BaseTexture > Texture

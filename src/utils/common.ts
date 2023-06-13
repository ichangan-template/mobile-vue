export const getImageUrl = (location: string) => new URL(`../assets/img/${location}`, import.meta.url).href;

// canvas画折线
export const pintLin = (canvas: HTMLCanvasElement) => {
  //获取Canvas对象(画布)
  // const canvas = document.getElementById('myCanvas');
  //获取对应的CanvasRenderingContext2D对象(画笔)
  canvas.width = window.innerWidth;
  canvas.height = 5;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.strokeStyle = '#fa0606';
    //注意，Canvas的坐标系是：Canvas画布的左上角为原点(0,0)，向右为横坐标，向下为纵坐标，单位是像素(px)。

    //开始一个新的绘制路径
    ctx.beginPath();
    //定义直线的起点坐标为(10,10)
    ctx.moveTo(0, 0);
    //定义直线的终点坐标为(50,10)

    for (let i = 0; i < 130; i++) {
      if (i % 2 == 0) {
        ctx.lineTo(i * 5, 0);
      } else {
        ctx.lineTo(i * 5, 5);
      }
    }

    //沿着坐标点顺序的路径绘制直线
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
  }
};

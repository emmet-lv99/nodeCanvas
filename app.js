//TODO 1. 이미지 넣는 방법 => clear
//TODO 2. text 그림자 넣는 방법
// fillStyle은 무조건 text, 오브젝트에 관계 없이 컬러를 채우는 속성

//fs모듈은 파일 시스템에 접근하는 모듈입니다. 즉, 파일을 생성하거나 삭제하고 읽거나 쓸 수 있습니다.
const fs = require('fs')
// canvas 생성
const { registerFont, createCanvas, loadImage } = require('canvas')
// 폰트 지정
registerFont('./SpoqaHanSansBold.ttf', { family: 'SpoqaHanSans' })

// 사이즈 조절
const width = 1080
const height = 1080
const canvas = createCanvas(width, height)

// canvas context 변수 선언
const context = canvas.getContext('2d')
// 백그라운드 컬러

context.fillStyle = '#60A0D0'
context.fillRect(0, 0, width, height)

//유저 아이디
context.font = '60px SpoqaHanSans'
context.textAlign = 'center'
context.textBaseline = 'top'
context.fillStyle = '#EBF8FF'
const textUserId = 'dachan.kim'
context.fillText(textUserId, 540, 100)

// 컨텐츠 타이틀
context.font = '40px SpoqaHanSans'
context.textAlign = 'center'
context.textBaseline = 'top'
context.fillStyle = '#D7EEF9'
const textImgTitle = '나의 인스타그램 가치는'
const textWidth = context.measureText(textImgTitle).width
roundedRect(context, 540 - textWidth / 2, 205, textWidth + 30, 80, 8)
context.fillStyle = '#61AAE3'
context.fillText(textImgTitle, 540, 207)

//해시태그
context.font = '40px SpoqaHanSans'
const textHash = '#후추 #whochooz'
context.fillStyle = '#D7EEF9'
context.fillText(textHash, 540, 830)

// 인스타 가격 밸류
context.font = '355px SpoqaHanSans'
context.textAlign = 'center'
context.textBaseline = 'top'
const textPriceValue = '88'
userPriceValueShadow (context, '#CDE0EE', textPriceValue, 540, 277, '#000', 3, 3, 15)


//라운드 사각형 rounded corner rectangle
function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x, y + radius);
  context.lineTo(x, y + height - radius);
  context.arcTo(x, y + height, x + radius, y + height, radius);
  context.lineTo(x + width - radius, y + height);
  context.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  context.lineTo(x + width, y + radius);
  context.arcTo(x + width, y, x + width - radius, y, radius);
  context.lineTo(x + radius, y);
  context.arcTo(x, y, x, y + radius, radius);
  //내부가 채워진 도형을 그림
  context.fill();
}

function userPriceValueShadow (context, color, userPriceValue, x, y, shadowColor, shadowX, shadowY, shadowBlur) {
  context.fillStyle = color
  context.shadowColor = shadowColor;
  context.shadowOffsetX = shadowX;
  context.shadowOffsetY = shadowY;
  context.shadowBlur = shadowBlur;
  context.fillText(userPriceValue, x, y)
}


//이미지 로드 & 파일 저장
loadImage('./price.png').then((image) => {
  context.drawImage(image, 10, 10, 100, 100)
  // console.log('<img src="' + canvas.toDataURL() + '" />')
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./output.png', buffer)
})

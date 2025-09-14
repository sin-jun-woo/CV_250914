// node app.js 로 결과 확인
// 정답 :
// 노트북 1200000->720000로 40% 할인 중!
// 키보드 100000->70000로 30% 할인 중!
// 모니터 300000->285000로 5% 할인 중!
// 마우스 50000->40000로 20% 할인 중!
// 헤드셋 150000->112500로 25% 할인 중!

// 'products'라는 이름의 상수 배열을 선언합니다.
// 각 요소는 제품의 이름(name)과 가격(price)을 담고 있는 객체입니다.
const products = [
  { name: "노트북", price: 1200000 },
  { name: "키보드", price: 100000 },
  { name: "모니터", price: 300000 },
  { name: "마우스", price: 50000 },
  { name: "헤드셋", price: 150000 },
];

// 'discountRates'라는 이름의 상수 객체를 선언합니다.
// 각 제품의 이름(key)에 해당하는 할인율(value)을 저장합니다. (예: 0.4는 40% 할인)
const discountRates = {
  노트북: 0.4,
  키보드: 0.3,
  모니터: 0.05,
  마우스: 0.2,
  헤드셋: 0.25,
};

// 'calculateDiscounts'라는 이름의 화살표 함수를 선언합니다.
// 이 함수는 'products' 배열과 'discountRates' 객체를 매개변수로 받습니다.
const calculateDiscounts = (products, discountRates) => {
  // 'products' 배열의 각 요소를 순회하며 새로운 배열을 만드는 .map() 메서드를 사용합니다.
  return products.map((product) => ({
    // 스프레드 문법(...)을 사용해 기존 product 객체의 모든 속성(name, price)을 복사합니다.
    ...product,
    // 'discountedPrice'라는 새로운 속성을 추가합니다.
    // 원래 가격에서 할인율을 적용한 최종 가격을 계산합니다. (예: 1 - 0.4 = 0.6, 즉 60% 가격)
    discountedPrice: product.price * (1 - discountRates[product.name]),
    // 'discountRate'라는 새로운 속성을 추가합니다.
    // 'discountRates' 객체에서 현재 제품 이름에 해당하는 할인율 값을 가져와 저장합니다.
    discountRate: discountRates[product.name],
  }));
};

// 위에서 정의한 'calculateDiscounts' 함수를 호출합니다.
// 'products'와 'discountRates'를 인자로 전달하고, 반환된 새로운 배열(할인 정보가 추가된 제품 목록)을
// 'discountedProducts' 상수에 저장합니다.
const discountedProducts = calculateDiscounts(products, discountRates);

// 'discountedProducts' 배열의 각 요소를 순회하는 .forEach() 메서드를 사용합니다.
discountedProducts.forEach((product) => {
  // console.log를 사용해 각 제품의 할인 정보를 형식에 맞춰 콘솔에 출력합니다.
  console.log(
    // 템플릿 리터럴(``)을 사용하여 문자열과 변수를 쉽게 조합합니다.
    `${product.name} ${product.price}->${product.discountedPrice}로 ${
      product.discountRate * 100 // 할인율(예: 0.4)을 퍼센트(40)로 변환하여 출력합니다.
    }% 할인 중!`
  );
});

// HTML에서 id가 "date-form"인 폼 요소를 가져옵니다.
const form = document.getElementById("date-form");
// HTML에서 id가 "apod-container"인, API 결과를 표시할 컨테이너 요소를 가져옵니다.
const apodContainer = document.getElementById("apod-container");

/**
 * NASA APOD API를 호출하여 특정 날짜의 천문학 사진 정보를 비동기적으로 가져오는 함수.
 */
const getApod = async () => {
  // 폼에서 사용자가 선택한 날짜 값을 가져옵니다.
  const date = form.date.value;
  // NASA APOD API에 요청할 URL을 생성합니다. 데모 키와 선택된 날짜를 포함합니다.
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=True&date=${date}`;

  // API 요청 및 데이터 처리는 오류가 발생할 수 있으므로 try...catch 문으로 감쌉니다.
  try {
    // fetch를 사용하여 API에 비동기적으로 GET 요청을 보내고 응답을 기다립니다.
    const response = await fetch(apiUrl);
    // 응답 본문을 JSON 형태로 파싱하고 완료될 때까지 기다립니다.
    const data = await response.json();

    // 응답이 성공적이지 않은 경우 (예: 404 Not Found, 500 Server Error 등)
    if (!response.ok) {
      // API가 제공하는 에러 메시지를 컨테이너에 표시하고 함수를 종료합니다.
      apodContainer.innerHTML = `<p>${data.error.message}</p>`;
      return;
    }

    // 응답이 성공적이면, 데이터에서 필요한 값들을 객체 구조 분해 할당으로 추출합니다.
    const { title, explanation, url, media_type } = data;
    // 미디어 타입이 'image'이면 원본 URL(url)을, 'video' 등 다른 타입이면 썸네일 URL(thumbnail_url)을 사용합니다.
    const srcUrl = media_type === "image" ? url : data.thumbnail_url;

    // 가져온 데이터로 HTML 콘텐츠를 생성하여 컨테이너의 내용을 교체합니다.
    apodContainer.innerHTML = `
    <h2>${title}</h2>
    <img id="apod-img" src="${srcUrl}" alt="${title}" />
    <p>${explanation}</p>
`;
  } catch (error) {
    // 네트워크 오류 등 fetch 과정 자체에서 에러가 발생하면 이 catch 블록이 실행됩니다.
    apodContainer.innerHTML = "<p>데이터를 불러오는 데 실패했습니다.</p>";
  }
};

// 폼(form)에 'submit' 이벤트가 발생했을 때 실행될 리스너를 추가합니다.
form.addEventListener("submit", (event) => {
  // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
  event.preventDefault();

  // getApod 함수를 실행하고, 비동기 작업이 성공적으로 완료되면(.then) 다음 작업을 수행합니다.
  getApod().then(() => {
    // API 호출이 끝나면 'hidden' 클래스를 제거하여 컨테이너를 화면에 표시합니다.
    apodContainer.classList.remove("hidden");
  });
});

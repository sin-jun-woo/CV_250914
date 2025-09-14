// HTML에서 id가 "dict-page"인 요소를 가져옵니다.
const dictPage = document.getElementById("dict-page");
// HTML에서 id가 "input-form"인 폼 요소를 가져옵니다.
const inputForm = document.getElementById("input-form");
// HTML에서 id가 "word-info"인, 결과가 표시될 영역의 요소를 가져옵니다.
const wordInfo = document.getElementById("word-info");

// 입력 폼(inputForm)에 'submit' 이벤트가 발생했을 때 실행될 리스너를 추가합니다.
inputForm.addEventListener("submit", (event) => {
  // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
  event.preventDefault();

  // 폼 안의 'word'라는 name을 가진 input 요소의 값(value)을 getDefinition 함수에 전달하여 호출합니다.
  getDefinition(inputForm.word.value);
});

/**
 * API를 호출하여 단어의 정의를 비동기적으로 가져오는 함수.
 * @param {string} word - 검색할 단어.
 */
const getDefinition = async (word) => {
  // Dictionary API에 요청할 URL을 생성합니다.
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  // fetch를 사용하여 API에 GET 요청을 보내고, 응답이 올 때까지 기다립니다.
  const response = await fetch(url);
  // 응답받은 데이터를 JSON 형태로 파싱하고, 완료될 때까지 기다립니다.
  const data = await response.json();

  // API가 단어를 찾지 못했을 경우, 특정 형태의 에러 객체를 반환합니다.
  if (data.title === "No Definitions Found") {
    // 단어를 찾지 못했다는 메시지를 화면에 표시합니다.
    wordInfo.innerHTML = `<p>"${word}"에 대한 검색 결과가 없습니다.</p>`;
  } else {
    // 단어를 찾았다면, 받은 데이터를 화면에 표시하는 함수를 호출합니다.
    displayWordDefinitions(data);
  }

  // 검색 결과에 따라 내용의 높이가 달라지므로, dictPage의 높이를 자동으로 조절하도록 설정합니다.
  dictPage.style.height = "auto";
};

/**
 * API로부터 받은 단어 정의 데이터를 HTML 요소로 만들어 화면에 표시하는 함수.
 * @param {Array} data - 단어 정의 정보가 담긴 배열.
 */
const displayWordDefinitions = (data) => {
  // 이전 검색 결과를 지우기 위해 wordInfo 영역을 비웁니다.
  wordInfo.innerHTML = "";

  // API 응답은 배열 형태일 수 있으므로(예: 'set'은 동사, 명사 등 여러 의미), 각 항목에 대해 반복합니다.
  data.forEach((wordData) => {
    // 단어 자체를 표시할 div 요소를 생성합니다.
    const wordElement = document.createElement("div");
    wordElement.classList.add("word");
    wordElement.innerHTML = `<h2>${wordData.word}</h2>`;

    // 해당 단어의 여러 품사별 의미(meanings)에 대해 반복합니다.
    wordData.meanings.forEach((meaning) => {
      // 품사를 표시할 div 요소를 생성합니다.
      const partOfSpeechElement = document.createElement("div");
      partOfSpeechElement.classList.add("part-of-speech");
      partOfSpeechElement.innerHTML = `<h3>${meaning.partOfSpeech}</h3>`;

      // 각 정의를 담을 순서 있는 리스트(<ol>) 요소를 생성합니다.
      const definitionsElement = document.createElement("ol");
      definitionsElement.classList.add("definitions");
      // 해당 품사의 모든 정의(definitions)에 대해 반복합니다.
      meaning.definitions.forEach((definition) => {
        // 각 정의를 담을 리스트 아이템(<li>) 요소를 생성합니다.
        const definitionItem = document.createElement("li");
        definitionItem.innerHTML = `<p>${definition.definition}</p>`;
        // 완성된 <li>를 <ol>에 추가합니다.
        definitionsElement.appendChild(definitionItem);
      });

      // 완성된 정의 리스트(<ol>)를 품사 요소(div)에 추가합니다.
      partOfSpeechElement.appendChild(definitionsElement);
      // 완성된 품사 요소를 단어 요소(div)에 추가합니다.
      wordElement.appendChild(partOfSpeechElement);
    });

    // 최종적으로 완성된 단어 정보 전체를 wordInfo 영역에 추가하여 화면에 표시합니다.
    wordInfo.appendChild(wordElement);
  });
};

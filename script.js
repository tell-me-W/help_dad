const CURRENT_YEAR = 2026;
const CURRENT_MONTH = 5;

const birthForm = document.querySelector("#birth-form");
const dadYearSelect = document.querySelector("#dad-year");
const dadMonthSelect = document.querySelector("#dad-month");
const momYearSelect = document.querySelector("#mom-year");
const momMonthSelect = document.querySelector("#mom-month");
const detailsContent = document.querySelector("#details-content");

const personalNote = document.querySelector("#personal-note");
const momNowTitle = document.querySelector("#mom-now-title");
const dadNowTitle = document.querySelector("#dad-now-title");
const dadBasicTitle = document.querySelector("#dad-basic-title");
const momBasicTitle = document.querySelector("#mom-basic-title");
const timelineDadYear = document.querySelector("#timeline-dad-year");
const timelineMomYear = document.querySelector("#timeline-mom-year");
const timelineNow = document.querySelector("#timeline-now");

function fillYearOptions(select, selectedYear) {
  for (let year = 1940; year <= CURRENT_YEAR; year += 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = `${year}년`;
    option.selected = year === selectedYear;
    select.append(option);
  }
}

function fillMonthOptions(select, selectedMonth) {
  for (let month = 1; month <= 12; month += 1) {
    const option = document.createElement("option");
    option.value = String(month);
    option.textContent = `${month}월`;
    option.selected = month === selectedMonth;
    select.append(option);
  }
}

function getAge(birthYear, birthMonth) {
  return CURRENT_YEAR - birthYear - (CURRENT_MONTH < birthMonth ? 1 : 0);
}

function getPensionStartAge(birthYear) {
  if (birthYear <= 1952) return 60;
  if (birthYear <= 1956) return 61;
  if (birthYear <= 1960) return 62;
  if (birthYear <= 1964) return 63;
  if (birthYear <= 1968) return 64;
  return 65;
}

function monthName(month) {
  return `${month}월`;
}

function getMonthAfter(birthYear, birthMonth, age) {
  const targetYear = birthYear + age;
  if (birthMonth === 12) {
    return { year: targetYear + 1, month: 1 };
  }
  return { year: targetYear, month: birthMonth + 1 };
}

function getMonthBefore(birthYear, birthMonth, age) {
  const targetYear = birthYear + age;
  if (birthMonth === 1) {
    return { year: targetYear - 1, month: 12 };
  }
  return { year: targetYear, month: birthMonth - 1 };
}

function getBirthdayMonth(birthYear, birthMonth, age) {
  return { year: birthYear + age, month: birthMonth };
}

function formatYearMonth(date) {
  return `${date.year}년 ${date.month}월`;
}

function getHealthCheckYear(birthYear) {
  return birthYear % 2 === CURRENT_YEAR % 2 ? CURRENT_YEAR : CURRENT_YEAR + 1;
}

function updateResults() {
  const dadYear = Number(dadYearSelect.value);
  const dadMonth = Number(dadMonthSelect.value);
  const momYear = Number(momYearSelect.value);
  const momMonth = Number(momMonthSelect.value);

  const dadAge = getAge(dadYear, dadMonth);
  const momAge = getAge(momYear, momMonth);
  const dadPensionAge = getPensionStartAge(dadYear);
  const dadPensionStart = getMonthAfter(dadYear, dadMonth, dadPensionAge);
  const dadBasicApply = getMonthBefore(dadYear, dadMonth, 65);
  const dadBasicBirthday = getBirthdayMonth(dadYear, dadMonth, 65);
  const momBasicApply = getMonthBefore(momYear, momMonth, 65);
  const momBasicBirthday = getBirthdayMonth(momYear, momMonth, 65);
  const momHealthYear = getHealthCheckYear(momYear);

  personalNote.innerHTML = `
    <strong>맞춤 확인 결과</strong>
    <ul>
      <li>아빠 국민연금: 만 ${dadPensionAge}세 기준, 대략 ${formatYearMonth(dadPensionStart)}부터 청구 가능성을 확인하세요.</li>
      <li>아빠 기초연금: 만 65세 생일이 있는 ${formatYearMonth(dadBasicBirthday)} 전 달인 ${formatYearMonth(dadBasicApply)}부터 신청 준비가 좋습니다.</li>
      <li>엄마 건강검진: 일반건강검진은 출생연도 홀짝과 가입자 유형에 따라 달라서 ${momHealthYear}년 대상 여부를 국민건강보험에서 확인하세요.</li>
      <li>부산 혜택: 동백전 카드, 동백패스 월 4만 5천 원 초과분 환급, 보건소 골다공증 검사 지원을 확인하세요.</li>
      <li>엄마 기초연금과 지하철 무임승차: ${formatYearMonth(momBasicBirthday)} 만 65세 도달 기준으로 준비하세요.</li>
    </ul>
  `;

  momNowTitle.textContent = `현재 · 엄마 만 ${momAge}세`;
  dadNowTitle.textContent = `현재 · 아빠 만 ${dadAge}세`;
  dadBasicTitle.textContent = `${dadBasicBirthday.year}년 · 아빠 만 65세`;
  momBasicTitle.textContent = `${momBasicBirthday.year}년 · 엄마 만 65세`;
  timelineDadYear.textContent = String(dadBasicBirthday.year);
  timelineMomYear.textContent = String(momBasicBirthday.year);
  timelineNow.textContent = `아빠 국민연금은 ${formatYearMonth(dadPensionStart)} 기준 확인, 엄마는 건강검진과 동백패스 확인`;
}

fillYearOptions(dadYearSelect, 1962);
fillYearOptions(momYearSelect, 1965);
fillMonthOptions(dadMonthSelect, 6);
fillMonthOptions(momMonthSelect, 2);

birthForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateResults();
  personalNote.classList.remove("is-hidden");
  detailsContent.classList.remove("is-hidden");
});

updateResults();

const monthSelect = document.querySelector("#birth-month");
const personalNote = document.querySelector("#personal-note");

function updateNote() {
  const month = Number(monthSelect.value);
  const basicStart = month === 1 ? "2026년 12월" : `2027년 ${month - 1}월`;
  const pensionMonth = month === 12 ? "2026년 1월" : `2025년 ${month + 1}월`;

  personalNote.textContent =
    `국민연금은 대략 ${pensionMonth}부터 청구 가능성을 확인하고, ` +
    `기초연금은 ${basicStart}부터 신청 준비를 시작하세요.`;
}

monthSelect.addEventListener("change", updateNote);
updateNote();

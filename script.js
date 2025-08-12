const form = document.getElementById("age-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Input elements
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    // Label elements
    const labelDay = document.querySelector('label[for="day"]');
    const labelMonth = document.querySelector('label[for="month"]');
    const labelYear = document.querySelector('label[for="year"]');

    // Error elements
    const errorDay = document.getElementById("error-day");
    const errorMonth = document.getElementById("error-month");
    const errorYear = document.getElementById("error-year");

    // Result elements
    const resultYears = document.getElementById("result-years");
    const resultMonths = document.getElementById("result-months");
    const resultDays = document.getElementById("result-days");

    // Set error text
    function setError(element, message) {
        element.textContent = message;
    }

    // Toggle red border styles
    function setInputErrorStyles(apply) {
        [dayInput, monthInput, yearInput].forEach(input =>
            input.classList.toggle("input-error", apply)
        );
        [labelDay, labelMonth, labelYear].forEach(label =>
            label.classList.toggle("label-error", apply)
        );
    }

    // Clear previous errors and styles
    [errorDay, errorMonth, errorYear].forEach(el => setError(el, ""));
    setInputErrorStyles(false);
    [resultYears, resultMonths, resultDays].forEach(el => (el.textContent = "--"));

    // Get and trim input values
    const day = dayInput.value.trim();
    const month = monthInput.value.trim();
    const year = yearInput.value.trim();

    let isValid = true;

    // Convert to numbers
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();

    // Required fields
    if (!day) {
        setError(errorDay, "This field is required");
        isValid = false;
    }

    if (!month) {
        setError(errorMonth, "This field is required");
        isValid = false;
    }

    if (!year) {
        setError(errorYear, "This field is required");
        isValid = false;
    }

    // Numeric validation
    if (day && (isNaN(dayNum) || dayNum < 1 || dayNum > 31)) {
        setError(errorDay, "Must be a valid day");
        isValid = false;
    }

    if (month && (isNaN(monthNum) || monthNum < 1 || monthNum > 12)) {
        setError(errorMonth, "Must be a valid month");
        isValid = false;
    }

    if (year && (isNaN(yearNum) || yearNum < 1000)) {
        setError(errorYear, "Must be a valid year");
        isValid = false;
    } else if (year && yearNum > currentYear) {
        setError(errorYear, "Must be in the past");
        isValid = false;
    }

    // Date validation
    if (isValid) {
        const inputDate = new Date(yearNum, monthNum - 1, dayNum);
        const today = new Date();

        const isDateMismatch =
            inputDate.getFullYear() !== yearNum ||
            inputDate.getMonth() + 1 !== monthNum ||
            inputDate.getDate() !== dayNum;

        if (isDateMismatch) {
            setError(errorDay, "Must be a valid date");
            isValid = false;
        } else if (inputDate > today) {
            setError(errorDay, "Date must not be in the future");
            isValid = false;
        }
    }

    // Show error if any input is invalid
    if (!isValid) {
        setInputErrorStyles(true);
        return;
    }

    // Age Calculation
    const today = new Date();
    let years = today.getFullYear() - yearNum;
    let months = today.getMonth() - (monthNum - 1);
    let days = today.getDate() - dayNum;

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display result
    resultYears.textContent = years;
    resultMonths.textContent = months;
    resultDays.textContent = days;
});
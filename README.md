# SE302_Homework_230302200

## Sweet Shop Web Testing – Playwright

This project contains **automated UI tests** for the Sweet Shop demo website using **Playwright with TypeScript**.  
The goal of the project is to validate key website functionalities based on **manually written test cases**.

---

##  Website Under Test
https://sweetshop.netlify.app/

---

##  Project Overview
The tests cover core features of the application, including:
- User authentication (login)
- Input validation (invalid email, empty password)
- Product browsing
- Promo code validation (negative scenario)

The project follows the **Page Object Model (POM)** design pattern to improve test readability and maintainability.

---

##  Automated Test Cases
The following manual test cases were automated:
- **TC_01** – Successful Login
- **TC_02** – Invalid Email Login
- **TC_03** – Empty Password Login
- **TC_04** – Browse Sweets List
- **TC_07** – Invalid Promo Code (verified by unchanged total)

---

##  How to Run the Tests
```bash
npm install
npx playwright install
npm test

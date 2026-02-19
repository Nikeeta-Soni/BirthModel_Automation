# Project Overview

This project automates the end-to-end User Signup and Account Deletion flow on:

http://automationexercise.com

The goal is to validate:
- User registration
- Account creation confirmation
- Successful login
- Account deletion
- Proper UI validations at each step

The automation is implemented using Playwright with stable selector practices and strong assertions.

---

# Application Under Test

Website: http://automationexercise.com  
Type: Public E-commerce Demo Application  
Primary Flow: Signup → Account Creation → Login → Delete Account

---

# Test Objective

Automate and validate the complete user lifecycle:

1. Launch browser
2. Navigate to homepage
3. Perform new user signup
4. Fill account information form
5. Create account
6. Validate account creation
7. Verify login status
8. Delete account
9. Validate account deletion

---

# Test Data

Name: Mathew Smith  
Email: mathew@yopmail.com  
Password: mathew@123  

Date of Birth:
- Day: 17
- Month: March
- Year: 2001

Address Details:
- First Name: Mathew
- Last Name: Smith
- Company: Mathew Inc Pvt Ltd
- Address: Address
- Address2: home
- Country: India
- State: Maharashtra
- City: Mumbai
- Zipcode: 556494
- Mobile: 9876452599

---

# Folder Structure

tests/ → Test specifications  
pages/ → Page Object classes  
utils/ → Helper utilities  
playwright.config.ts → Configuration  
CLAUDE.md → Project context  

---

# Coding Standards

- Use Playwright Test Runner
- Prefer getByRole() and getByLabel() selectors
- Avoid waitForTimeout()
- Use explicit expect assertions
- Validate visibility before interaction
- Avoid force clicks unless necessary
- Use stable selectors over nth-child

---

# Validation Rules

Each step must include an assertion:

- Home page visible → Verify page title or key hero element
- "New User Signup!" visible → expect(locator).toBeVisible()
- "ENTER ACCOUNT INFORMATION" visible → verify heading
- "ACCOUNT CREATED!" visible → validate confirmation message
- "Logged in as Mathew Smith" visible → verify header section
- "ACCOUNT DELETED!" visible → validate final confirmation

No step should proceed without validating previous success.

---

# Stability Requirements

- Wait for page load using:
  await page.waitForLoadState('networkidle')

- Use expect(locator).toBeVisible() instead of manual waits
- Handle dropdowns using selectOption()
- Ensure form fields are filled using fill() with validation

---

# Known Risks

- Email may already exist → If so, use dynamic email generation
- Slow network → Use proper waitForLoadState
- UI changes → Prefer semantic selectors

---

# Testing Strategy

- Single test case covering full lifecycle
- Add separate negative test in future:
  - Existing email validation
  - Required field validation
  - Password validation

---

# Future Enhancements

- Convert to Page Object Model
- Add test data generator for unique emails
- Add parallel execution
- Add retry logic for CI
- Integrate with GitHub Actions

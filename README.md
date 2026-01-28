# Playwright Framework Structure

## 📂 Project Structure

```bash
📂 pages/                        # Page Object Model classes
├── 📂 A/                        
│   └── 📄 APage.js
├── 📂 B/                        
│   └── 📄 BPage.js
├── 📂 C/                        
│   └── 📄 CPage.js
├── 📂 base/                     # Base page class
└── 📂 commonfunctions/          # Reusable utility methods

📂 tests/                        # Test cases
├── 📂 Atest/                    
│   └── 📄 APage.spec.js
├── 📂 Btest/                    
│   └── 📄 BPage.spec.js
├── 📂 Ctest/                    
│   └── 📄 CPage.spec.js
└── 📄 runner.spec.js            # Runner file to trigger multiple test suites

📂 .github/
└── 📂 workflows/
    └── 📄 main.yml              # GitHub Actions CI workflow

📄 package.json
📄 README.md

🚀 Features :

Playwright + JavaScript based end-to-end testing
Page Object Model (POM) for clean separation of concerns
Reusable components in base/ and commonfunctions/
Runner file to execute multiple test cases sequentially
GitHub Actions CI integration via main.yml
Easy scalability for adding new modules and test cases

🛠️ Installation
Initialize the repository:
create a folder and open gitbash 
git init 

Clone the repository:
git clone https://github.com/<your-username>/<your-reponame>.git

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

▶️ Running Tests

Run a specific test file:
npx playwright test tests/Atest/APage.spec.js

Run all tests:
npx playwright test

Run tests using the runner file:
npx playwright test tests/runner.spec.js

⚙️ GitHub Actions CI

This framework is integrated with GitHub Actions.
The workflow file main.yml is located in .github/workflows/.

It:
Installs dependencies
Runs Playwright tests
Generates reports
To trigger the workflow, click on run workflow in Actions.
main.yml can be customized for parallel runs, artifacts, or notifications.

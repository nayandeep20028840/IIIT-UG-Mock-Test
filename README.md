
# IIITprep UGEE Mock Test

This is a **Next.js** project designed for **IIITprep UGEE Mock Test**. It is a simple web application that displays a mock test for IIIT UGEE aspirants. The test consists of 50 questions and the user can navigate through the questions using the navigation buttons. The user can also view the exam summary, which includes the countdown timer. The user can finish the exam at any time.


## 🛠️ Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


## Project Structure
```
.
├── src
│   ├── app
│   │   ├── page.tsx  # Main Page Component
│   |   ├── layout.tsx  # Question Data
│   ├── components
│   │   ├── ExamSummary.tsx  # Exam Timer & Summary
|   |   ├── iiitprep-logo.svg  # IIITprep Logo
│   │   ├── Navbar.tsx  # Navigation Bar
│   │   ├── QuestionButtons.tsx  # Question Navigation
|   |   ├── Questions.tsx  # Question Component
├── .gitignore  # Git Ignore File
├── next.config.js  # Next.js Configuration
├── package.json  # Node.js Package File
├── postcss.config.mjs  # PostCSS Configuration
├── README.md  # Readme File
├── tailwind.config.js  # Tailwind CSS Configuration
├── tsconfig.json  # TypeScript Configuration

```


## Key Dependencies
- **[Next.js](https://nextjs.org/)** - React Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Static Typing
- **[tailwindcss](https://tailwindcss.com/)** - Utility-First CSS Framework
- **[react-icons](https://react-icons.github.io/react-icons/)** - Icon Library
- **[zustand](https://zustand.surge.sh/)** - State Management


## Key Components
- **Navbar** - Sticky Navigation Bar
- **ExamSummary** - Countdown Timer & Exam Summary
- **QuestionButtons** - Question Navigation Buttons


## Deployment
This project is deployed on **Vercel**. You can access the live version [here](https://mock-test-astqquk61-nayandeep20028840s-projects.vercel.app/).


## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.


---
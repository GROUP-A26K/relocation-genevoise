# relocation-genevoise

This is a relocation-genevoise project built with Next.js and Sanity. It includes configurations for Next.js development, Sanity integration, and TypeScript support, along with TailwindCSS for styling.

## Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Sanity CLI](https://www.sanity.io/docs/cli) (installed globally)

## Steps to Run the Project

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd relocation-genevoise
   ```

2. **Set Up Environment Variables**
   Copy the `.env.example` file to `.env`:

   ```bash
   cp .example.env .env.local
   ```

   Update the `.env` file with the required environment variables.

3. **Install Dependencies**
   Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

4. **Start the Project**
   Start the development server by running:

   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Setup Structure

This project follows a well-defined structure for better scalability and maintainability. The setup process and architecture were inspired by the following resources:

1. **Next.js Documentation**:

   - Setup and features: [Next.js Docs](https://nextjs.org/docs)

2. **Sanity.io Documentation**:
   - Setting up Sanity with Next.js: [Sanity Docs](https://www.npmjs.com/package/next-sanity)
   - Setting up Visual Editing: [Sanity Docs](https://www.sanity.io/guides/nextjs-app-router-live-preview)
3. **TailwindCSS Setup**:

   - Configuring Tailwind with Next.js: [Tailwind Docs](https://tailwindcss.com/docs/guides/nextjs)

4. **Zustand and Zod**:
   - Zustand for state management: [Zustand Docs](https://github.com/pmndrs/zustand)
   - Zod for schema validation: [Zod Docs](https://github.com/colinhacks/zod)

---

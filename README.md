# FBI Art Crime Dashboard

This is a web application created for a coding challenge. It displays data about art crimes fetched from the public FBI API (`https://api.fbi.gov/@artcrimes`).

## Features

- Fetches and displays art crime data from the FBI API.
- Presents data in a sortable table format.
- Implements pagination to navigate through results.
- Allows searching/filtering items by title (debounced).
- Clicking a table row opens a modal with detailed information about the item.
- Basic accessibility considerations (semantic HTML, ARIA labels).

## Tech Stack

- **Framework:** React (using Vite)
- **Language:** TypeScript
- **Styling:** CSS Modules & Global CSS

## How to Deploy Locally

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd fbi-art-theft-dashboard
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install or pnpm install
    ```

3.  **Set up Environment Variables:**

    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file:
      - `VITE_FBI_API_BASE_URL`: Should be pre-filled (`https://api.fbi.gov/@artcrimes/v1/list`).
      - `VITE_FBI_API_KEY`: **Optional but Recommended.** The public FBI API has strict rate limits (`30/hour`, `50/day`) when using the default `DEMO_KEY`. Request a free API key from [api.data.gov/signup/](https://api.data.gov/signup/) to get a higher limit (`1000/hour`). Add your key here. If left blank, `DEMO_KEY` will be used.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or yarn dev or pnpm dev
    ```

5.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Design Decisions

- **API Interaction:** A custom hook (`useApi`) was created to encapsulate data fetching logic, state management (loading, error, data), pagination, and search parameters. This keeps the `App` component cleaner and promotes reusability.
- **Pagination:** Chosen over infinite scroll as the API provides clear `total` and `page` parameters, making pagination straightforward and predictable.
- **Search:** Implemented filtering by `title` using the API's query parameter. The search input is debounced (500ms) to prevent excessive API calls while typing. The search term is URL encoded.
- **State Management:** For this application's scale, React's built-in hooks (`useState`, `useEffect`) are sufficient. No external state management library (like Redux) was deemed necessary.
- **Styling:** CSS Modules were used for component-level styles to avoid class name collisions, supplemented by a global `App.css` for basic layout and theming. Focus was on clarity and usability over complex design.
- **Error Handling:** Basic error handling is implemented. The API hook catches fetch errors and API-returned errors (like 4xx/5xx status codes, including 429 rate limits) and displays a message to the user via the `ErrorMessage` component.
- **Detail View:** Implemented as a modal window for a quick view without navigating away from the main list. Basic accessibility features like focus trapping and keyboard navigation (Escape key) are included.
- **API Key:** Handled via environment variables (`.env`) for security and configuration flexibility. Falls back to `DEMO_KEY` if none is provided.

## Potential Improvements (If Time Allowed)

- **More Robust Error Handling:** Display more specific error messages (e.g., network offline vs. API error). Implement retry logic for transient network issues.
- **Testing:** Implement unit and integration tests using Vitest and React Testing Library for components and the API hook.
- **Accessibility Enhancements:** Improve focus management in the modal. Add ARIA attributes where needed for more complex interactions. Ensure proper color contrast ratios.
- **UI/UX Polish:** Improve visual design, potentially using a lightweight UI component library. Add transitions for smoother user experience. Better handling of empty image states.
- **Performance:** Implement client-side caching for API responses. Optimize image loading further (e.g., placeholders).
- **Infinite Scroll:** Offer infinite scrolling as an alternative pagination method.

## Git Repository

https://github.com/r-lofcroft/fbi-art-theft-dashboard

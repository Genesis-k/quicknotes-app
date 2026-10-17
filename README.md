# QuickNotes

QuickNotes is a responsive, browser-based productivity app built with semantic HTML5, modern CSS3 (Flexbox and Grid), and vanilla JavaScript. It offers a friction-free workspace where users can jot down categorized thoughts, study reminders, or work tasks, search through their archive in real time, and persist their notes across browser refreshes via the Web Storage API.

## Features

- **Categorized Notes**: Organize notes under Personal, Work, or Study tags with distinct color-coded left borders.
- **Dynamic Search**: Live, case-insensitive keyword filtering across all existing notes.
- **Form Validation**: Strict client-side verification preventing empty entries and capping content at 200 characters.
- **Data Persistence**: Automatic background synchronization using `localStorage` so notes survive browser reloads.
- **Responsive Layout**: Fluid desktop and mobile interfaces with vertical stacking on small screens.
- **Safe DOM Rendering**: Built exclusively with `document.createElement` and `textContent` to prevent Cross-Site Scripting (XSS).
- **Batch Management**: Includes individual deletion and a confirmation-guarded "Clear All" action.

## How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/Genesis-k/quicknotes-app.git](https://github.com/Genesis-k/quicknotes-app.git)
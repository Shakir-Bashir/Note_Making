# Notes App

Notes app that allows users to create notes with rich content and organize them.

## Features

* Create, update, and delete notes
* Add headings (up to 3 levels)
* Insert images
* Create unordered lists
* Add plain text nodes
* Reorder notes (drag and drop)
* Authentication

## Demo
[https://mtnotes.netlify.app/]

## Tech Stack

The app is generated with Vite and uses the following technologies:

* React
* TypeScript
* DndKit (drag and drop)
* CSS Modules
* Supabase (database, authentication, storage)
* Netlify (hosting)

## Running the app

To run the app locally, you need to create a Supabase project and add the following environment variables to your `.env` file:
```bash
VITE_SUPABASE_URL=""
VITE_SUPABASE_API_KEY=""
```
Then run the following commands:
```
npm install
npm run dev

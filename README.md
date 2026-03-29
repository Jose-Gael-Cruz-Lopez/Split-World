# Split World

## Inspiration

We wanted to bring people together through a game they already know and love, right inside Snapchat. Charades is universal: it's simple, social, and hilarious. Split World reimagines that experience as a quick, sendable AR minigame between friends.

## What it does

Split World is an asymmetric charades game built entirely within Snapchat. One player, the hinter, records a video of themselves acting out a keyword using a stick figure body-tracking filter. The other player receives the clip and tries to guess the word. It's fast, funny, and designed to be shared.

## How we built it

We built Split World in Lens Studio using its scripting framework and AR capabilities. We used Claude Code as our primary development copilot, connected through Cursor's MCP pipeline. This setup allowed us to iterate rapidly on animations, UI, and body tracking logic while learning the platform in real time.

## Challenges we ran into

Lens Studio has a steep learning curve. The documentation is sparse in places, and the editor workflow can feel unintuitive. Customizing AR behavior to match our vision required more trial and error than expected, and debugging within the Snap ecosystem added another layer of complexity.

## Accomplishments that we're proud of

We shipped a working AR game with real-time body tracking, animated stick figure rendering, and a complete keyword and guessing system, all inside a Snapchat lens. Getting these systems to work together smoothly felt like a significant milestone.

## What we learned

AI can accelerate development dramatically, but it cannot replace understanding. When we ran into limitations with Lens Studio, we had to slow down, read documentation carefully, and reason through problems ourselves. The biggest lesson was that depth of understanding matters more than speed when working with unfamiliar tools.

## What's next for Split World

We plan to add a global leaderboard to track all-time wins, support multi-round games within a single session, and expand keyword categories to keep the experience fresh.

## 🔧 Technologies Used

- Snapchat Lens Studio 5.x
- Lens Studio Scripting API
- JavaScript (ES2019)
- Easy Lens components
- Body Segmentation package assets

## 💫 Features

- Asymmetric charades gameplay loop (hinter and guesser)
- Stick figure/body-tracking visual effect
- Tap-driven interaction flow across game states
- Sendable Snapchat-native social gameplay format
- Keyword-based act-and-guess mechanic

## 📁 Project Structure

- Assets/
	- Main lens resources (scene, scripts, materials, textures, meshes, and packages)
- Assets/Easy Lens/
	- Core controller scripts and generated Easy Lens assets
- Assets/UI_one.lspkg/
	- UI package resources used by the lens
- Assets/working_orthographic.lspkg/
	- Orthographic setup package resources
- Packages/
	- Lens package resources and material assets
- Split World_Lens Studio.esproj
	- Main Lens Studio project file
- preview.mp4
	- Demo video preview

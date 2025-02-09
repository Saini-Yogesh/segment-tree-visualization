# Segment Tree Visualizer

![image](https://github.com/user-attachments/assets/65c8bab3-897c-47ce-88ec-d348bc350310)

## Introduction
The Segment Tree Visualizer is a web-based application built using Next.js that provides an interactive way to understand and visualize different types of segment trees. This project showcases efficient data structure operations and dynamic visualizations.

## Features
- **Segment Tree Types:**
  - Find Minimum
  - Find Maximum
  - Find Sum
- **User Interaction:**
  - Update a number by index
  - Perform range queries (sum, min, max)
  - Range updates
- **Visualization Controls:**
  - Speed control with customizable speeds
  - Input options for user-defined or default values
  - Real-time segment tree display with node ranges and values
- **Color-coded Animations:**
  - Enhance visualization for node updates and branch traversals

## Project Structure
```
segment-tree-visualizer/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── featuresToWork/
│   │   │   ├── DownloadButton.js
│   │   │   └── ZoomButton.js
│   │   ├── functions/
│   │   │   └── BuildHierarchy.js
│   │   ├── ScrollToTopButton/
│   │   │   ├── arrowUpSolid.svg
│   │   │   ├── ScrollToTopButton.js
│   │   │   └── ScrollToTopButtonCSS.css
│   ├── operations/
│   │   ├── HandleRangeQuery.js
│   │   ├── HandleRangeUpdate.js
│   │   └── HandleUpdateIndex.js
│   ├── styles/
│   │   ├── InputSection.css
│   │   ├── SegmentTreeD3.css
│   │   └── TreeVisualizer.css
│   ├── utils/
│   │   ├── segmentTreeUtils.js
│   │   ├── InputSection.js
│   │   ├── SegmentTreeD3.js
│   │   └── TreeVisualizer.js
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/segment-tree-visualizer.git

# Navigate to the project directory
cd segment-tree-visualizer

# Install dependencies
npm install
```

### Running the Application
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage
1. **Choose Segment Tree Type:** Select the minimum, maximum, or sum from find.
2. **Provide Input:** Enter custom array values or use default ones.
3. **Perform Queries:** Execute range queries and updates.
4. **Adjust Speed:** Control the visualization speed.

## Technologies Used
- **Next.js:** Framework for server-rendered React applications
- **JavaScript:** Logic implementation for segment tree operations

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## Contact
For any queries, feel free to reach out:
- **Email:** [yogesh.saini4002@gmail.com](mailto:yogesh.saini4002@gmail.com)


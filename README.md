# Barbie Scanner

A web application that uses AI vision to identify different types of Barbie dolls from photos. Simply take a picture of a Barbie doll, and the app will analyze it to tell you which Barbie it is.

## Features

- 📸 Real-time camera access using device's camera
- 🤖 AI-powered Barbie identification
- 📱 Mobile-friendly responsive design
- 🖼️ Image preview before submission
- ✨ Clean and intuitive user interface

## How It Works

1. **Take a Picture**: 
   - Open the app in your browser
   - Grant camera permissions when prompted
   - Position your code in frame
   - Click the "Take Picture" button
   - Review the captured image

2. **AI Analysis**:
   - The captured image is securely sent to our AI vision model
   - The model analyzes the image to identify the product code
   - Results are returned within seconds

3. **View Results**:
   - See detailed information about the identified Barbie
   - Results include the type of Barbie and other relevant details
   - Take another picture to scan a different Barbie

## Technology Stack

- **Frontend**: Next.js 13+ with React
- **Styling**: Tailwind CSS
- **Camera Interface**: Web APIs (getUserMedia)
- **AI Vision**: Advanced image recognition model

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/barbie-scanner.git
   ```

2. Install dependencies:
   ```bash
   cd barbie-scanner
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Requirements

- Modern web browser with camera access
- Camera permissions enabled
- JavaScript enabled
- Internet connection for AI model access

## Privacy

- Images are processed securely and not stored permanently
- Camera access is only used when taking pictures
- No personal data is collected or stored

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. All contributions are welcome!

## License

MIT License - feel free to use this project for your own purposes.

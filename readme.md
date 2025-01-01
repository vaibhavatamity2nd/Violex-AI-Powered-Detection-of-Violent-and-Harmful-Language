### VioLex

https://github.com/user-attachments/assets/82311c24-aa28-4550-b0d8-c6466fd2541b


### Setup Instructions

To get this project running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/audio-text-filtering.git
cd audio-text-filtering
```

### 2. Install Dependencies

This project requires several Python libraries. To install them, run:

```bash
pip install -r requirements.txt
```

Ensure that you have `ffmpeg` installed on your system to handle audio conversion. For example:

- **On Ubuntu:**

  ```bash
  sudo apt-get install ffmpeg
  ```

- **On macOS (using Homebrew):**

  ```bash
  brew install ffmpeg
  ```

### 3. Prepare CSV Files

The app requires two CSV files:

- `words.csv`: A list of words for contextually appropriate replacements.
- `abusive_words.csv`: A list of abusive words to be replaced by "[MASK]" and then filled with a suitable word.

Ensure these CSV files are in the project directory (or adjust the paths in the code accordingly).

### 4. Run the Flask Application

Once you have installed the dependencies and prepared the CSV files, you can start the Flask app by running:

```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000/`.

### 5. Use the Application

- **Audio Upload Endpoint:**
  
  You can upload an audio file to the `/upload` endpoint using a POST request. The audio will be transcribed to text using Google's speech recognition API.

- **Text Processing Endpoint:**
  
  Send a POST request to the `/process` endpoint with the following JSON payload:

  ```json
  {
    "sentence": "your input sentence here"
  }
  ```

  The app will process the sentence by replacing words according to the words in `words.csv` and `abusive_words.csv`.

### 6. Example Request

#### Upload Audio Example

Send a `POST` request with an audio file to the `/upload` endpoint.

**URL:**
```
POST /upload
```

**Request Body (Form Data):**
```
file: <audio_file>
```

**Response:**
```json
{
  "text": "Recognized text from the audio"
}
```

#### Process Text Example

Send a `POST` request to `/process` with a sentence.

**URL:**
```
POST /process
```

**Request Body (JSON):**
```json
{
  "sentence": "I am very happy with this!"
}
```

**Response:**
```json
{
  "processed_sentence": "I am very content with this!"
}
```

## Project Structure

```
Violex/
│
├── app.py               # Main Flask application
├── words.csv            # CSV file with general words for replacement
├── abusive_words.csv    # CSV file with abusive words to be replaced
├── templates/
│   └── index.html       # Frontend HTML template
├── static/              # Static files (CSS, JS, etc.)
│   └── style.css
    └── script.js
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

## Dependencies

The application requires the following libraries:

- Flask
- transformers (for BERT model)
- pydub
- speech_recognition
- numpy
- requests

To install these, use:

```bash
pip install -r requirements.txt
```

You can generate the `requirements.txt` file by running:

```bash
pip freeze > requirements.txt
```

## Acknowledgements

- **Google Speech Recognition API**: For transcribing audio to text.
- **BERT (Hugging Face)**: For context-sensitive word replacement using a pre-trained BERT model.
- **Pydub**: For audio processing and conversion.
  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

- **Issue:** If the audio is not being recognized, make sure the audio file is in a supported format (e.g., WAV, MP3).
- **Issue:** If the replacement isn't working, check that your `words.csv` and `abusive_words.csv` are correctly formatted and located in the project directory.

## Future Improvements

- Add support for more audio formats.
- Improve the BERT-based replacement by fine-tuning the model.
- Provide a frontend interface for interacting with the app.
- Implement authentication for users to upload files and view history.

```

### Notes:

1. Replace `yourusername` with your actual GitHub username in the clone URL.
2. The application assumes that the CSV files (`words.csv` and `abusive_words.csv`) exist and are properly formatted.
3. Make sure the `ffmpeg` library is installed on your system to handle audio file conversion if needed.

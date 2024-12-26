from flask import Flask, request, jsonify, render_template
import csv

app = Flask(__name__)

def read_words_from_csv(file_path):
    """
    Reads words from a CSV file. Assumes the CSV has a single column with words.
    """
    words_list = []
    try:
        with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for i, row in enumerate(reader, start=1):
                if row:  # Avoid empty rows
                    words_list.append((row[0].strip(), str(i)))  # Assign S.No based on line number
    except FileNotFoundError:
        print("Error: The file was not found.")
    return dict(words_list)

def process_sentence(sentence, words_dict):
    """
    Processes the sentence, checking for words in the words_dict and annotating them.
    """
    words = sentence.split()
    annotated_words = []

    for word in words:
        cleaned_word = word.strip(".,!?;:")  # Remove punctuation for matching
        if cleaned_word in words_dict:
            annotated_words.append(f"{word}({words_dict[cleaned_word]})")
        else:
            annotated_words.append(word)

    return ' '.join(annotated_words)

# Load the words from the CSV file
csv_file_path = "words.csv"  # Replace with your CSV file path
words_with_sno = read_words_from_csv(csv_file_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    user_sentence = data.get("sentence", "")
    if user_sentence and words_with_sno:
        result_sentence = process_sentence(user_sentence, words_with_sno)
        return jsonify({"processed_sentence": result_sentence})
    return jsonify({"error": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)

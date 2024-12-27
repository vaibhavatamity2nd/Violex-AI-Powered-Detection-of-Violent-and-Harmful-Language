from flask import Flask, request, jsonify, render_template
import csv
from transformers import pipeline
import re

app = Flask(__name__)

# Load a language model pipeline for generating suitable replacements
fill_mask = pipeline("fill-mask", model="bert-base-uncased")  # Replace with a suitable model

def read_words_from_csv(file_path):
    """
    Reads words from a CSV file. Assumes the CSV has a single column with words.
    """
    words_list = []
    try:
        with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if row:  # Avoid empty rows
                    words_list.append(row[0].strip().lower())  # Convert to lowercase for case-insensitive matching
    except FileNotFoundError:
        print("Error: The file was not found.")
    return words_list

def generate_suitable_sentence(sentence, words_list, abusive_words_list):
    """
    Generates a sentence by replacing words dynamically with contextually suitable or censored words.
    """
    words = sentence.split()
    processed_words = []

    for word in words:
        cleaned_word = re.sub(r'[^\w\s]', '', word).lower()  # Remove punctuation and convert to lowercase
        if cleaned_word in abusive_words_list:
            # Handle abusive word replacement with masking
            masked_sentence = sentence.replace(word, "[MASK]", 1)
            predictions = fill_mask(masked_sentence)
            best_replacement = predictions[0]["token_str"]  # Get the top prediction
            processed_word = word.replace(cleaned_word, best_replacement, 1)  # Replace abusive word
            processed_words.append(processed_word)
        elif cleaned_word in words_list:
            # Handle contextual replacement for words in the general list
            masked_sentence = sentence.replace(cleaned_word, "[MASK]", 1)
            predictions = fill_mask(masked_sentence)
            best_replacement = predictions[0]["token_str"]  # Get the top prediction
            processed_word = word.replace(cleaned_word, best_replacement, 1)
            processed_words.append(processed_word)
        else:
            processed_words.append(word)  # Keep the word as is if no replacement is required

    return ' '.join(processed_words)

# Load the words and abusive words from the CSV files
general_csv_path = "Finale/Final_MP/words.csv"  # Replace with your general words CSV file path
abusive_csv_path = "Finale/Final_MP/abusive_words.csv"  # Replace with your abusive words CSV file path
replacement_candidates = read_words_from_csv(general_csv_path)
abusive_words = read_words_from_csv(abusive_csv_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    user_sentence = data.get("sentence", "")
    if user_sentence and replacement_candidates:
        result_sentence = generate_suitable_sentence(user_sentence, replacement_candidates, abusive_words)
        return jsonify({"processed_sentence": result_sentence})
    return jsonify({"error": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)
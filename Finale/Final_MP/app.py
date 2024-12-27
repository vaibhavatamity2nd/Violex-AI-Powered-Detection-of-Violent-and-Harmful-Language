from flask import Flask, request, jsonify, render_template
import csv
from transformers import pipeline
import re

app = Flask(__name__)

# Load a language model pipeline for generating suitable replacements
fill_mask = pipeline("fill-mask", model="bert-base-uncased")  # Replace with a suitable model

def read_words_from_csv(file_path):
    """
    Reads words from a CSV file. Assumes the CSV has two columns: word, replacement.
    """
    words_dict = {}
    try:
        with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if row and row[0]:  # Avoid empty rows
                    words_dict[row[0].strip().lower()] = row[1].strip() if len(row) > 1 else "*****"
    except FileNotFoundError:
        print("Error: The file was not found.")
    return words_dict

def generate_suitable_sentence(sentence, general_words_dict, abusive_words_dict):
    """
    Generates a sentence by replacing words dynamically with contextually suitable or censored words.
    """
    words = sentence.split()
    processed_words = []

    for word in words:
        cleaned_word = re.sub(r'[^\w\s]', '', word).lower()  # Remove punctuation and convert to lowercase
        
        # Check if the word is in abusive words list
        if cleaned_word in abusive_words_dict:
            # Get the replacement word or '*****' if not found
            replacement = abusive_words_dict.get(cleaned_word, "*****")
            processed_word = word.replace(cleaned_word, replacement, 1)
            processed_words.append(processed_word)
        elif cleaned_word in general_words_dict:
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

general_words_dict = read_words_from_csv(general_csv_path)
abusive_words_dict = read_words_from_csv(abusive_csv_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    user_sentence = data.get("sentence", "")
    if user_sentence:
        result_sentence = generate_suitable_sentence(user_sentence, general_words_dict, abusive_words_dict)
        return jsonify({"processed_sentence": result_sentence})
    return jsonify({"error": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)

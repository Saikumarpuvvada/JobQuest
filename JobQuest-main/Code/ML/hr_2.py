from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
from ftfy import fix_text
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import nltk
nltk.download('stopwords')

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for your frontend URL
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Load job data from CSV
df = pd.read_csv('job_final.csv')

# Clean job descriptions by removing stopwords
stopw = set(stopwords.words('english'))
df['test'] = df['Job_Description'].apply(
    lambda x: ' '.join([word for word in str(x).split() if len(word) > 2 and word.lower() not in stopw])
)

# Helper function to generate character n-grams
def ngrams(string, n=3):
    string = fix_text(string)
    string = string.encode("ascii", errors="ignore").decode()
    string = string.lower()
    chars_to_remove = [")", "(", ".", "|", "[", "]", "{", "}", "'"]
    rx = '[' + re.escape(''.join(chars_to_remove)) + ']'
    string = re.sub(rx, '', string)
    string = string.replace('&', 'and').replace(',', ' ').replace('-', ' ')
    string = string.title()
    string = re.sub(' +', ' ', string).strip()
    string = ' ' + string + ' '
    string = re.sub(r'[,-./]|\sBD', r'', string)
    return [''.join(ngram) for ngram in zip(*[string[i:] for i in range(n)])]

# API endpoint to get matching jobs
@app.route('/api/get_jobs', methods=['GET'])
def get_jobs():
    resume = request.args.get('resume', '')
    if not resume:
        return jsonify({'error': 'Resume text is required.'}), 400

    # Vectorize input
    skills = [' '.join(resume.split())]
    vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, lowercase=False)
    tfidf = vectorizer.fit_transform(skills)

    # Fit NearestNeighbors on the cleaned job descriptions
    nbrs = NearestNeighbors(n_neighbors=1, n_jobs=-1).fit(tfidf)

    def getNearestN(query):
        queryTFIDF_ = vectorizer.transform(query)
        distances, indices = nbrs.kneighbors(queryTFIDF_)
        return distances, indices

    unique_org = df['test'].values
    distances, indices = getNearestN(unique_org)

    matches = [[round(distances[i][0], 2)] for i in range(len(indices))]
    df['match'] = pd.DataFrame(matches, columns=['Match confidence'])

    # Return top 10 closest matches
    top_matches = df.sort_values('match')[['Position', 'Company', 'Location']].head(10).reset_index(drop=True)
    return jsonify(top_matches.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)

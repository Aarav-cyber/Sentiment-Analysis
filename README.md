# Sentiment Analysis Project

A full-stack sentiment analysis application that predicts whether movie reviews are positive or negative using machine learning. The project consists of three main components: a machine learning model, a backend API, and a React frontend.

## 🏗️ Project Architecture

```
Sentiment Analysis/
├── ml/                    # Machine Learning Component
│   ├── api.py            # Flask API for ML predictions
│   ├── sentiment.ipynb   # Jupyter notebook for model training
│   ├── IMDB Dataset.csv  # Training dataset
│   ├── sentiment_model.joblib    # Trained ML model
│   ├── vectorizer.joblib         # TF-IDF vectorizer
│   └── venv/             # Python virtual environment
├── server/               # Node.js Backend Server
│   ├── index.js         # Express server
│   ├── package.json     # Node.js dependencies
│   └── node_modules/    # Node.js packages
└── client/              # React Frontend
    ├── src/
    │   ├── App.jsx      # Main React component
    │   ├── App.css      # Styling
    │   └── main.jsx     # React entry point
    ├── package.json     # React dependencies
    └── node_modules/    # React packages
```

## 🔄 System Flow

1. **User Input**: User enters text in the React frontend
2. **Frontend → Backend**: React app sends POST request to Node.js server (port 5000)
3. **Backend → ML API**: Node.js server forwards request to Flask ML API (port 8000)
4. **ML Processing**: Flask API processes text using trained model and vectorizer
5. **Response Chain**: Results flow back through the chain to display in frontend

## 🧠 Machine Learning Component

### Model Details
- **Algorithm**: Logistic Regression
- **Vectorization**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Dataset**: IMDB Movie Reviews Dataset
- **Features**: 2,500 most important words
- **Output**: Binary classification (0 = Negative, 1 = Positive)

### Training Process
1. **Data Preprocessing**: 
   - Removed duplicates
   - Cleaned text by removing stopwords and common words ('movie', 'film')
   - Generated word clouds for visualization

2. **Feature Engineering**:
   - Applied TF-IDF vectorization with 2,500 max features
   - Split data: 80% training, 20% testing

3. **Model Training**:
   - Trained Logistic Regression classifier
   - Evaluated using confusion matrix
   - Saved model and vectorizer using joblib

### Files
- `sentiment.ipynb`: Complete training pipeline and analysis
- `sentiment_model.joblib`: Trained logistic regression model
- `vectorizer.joblib`: TF-IDF vectorizer for text preprocessing
- `IMDB Dataset.csv`: Training dataset with movie reviews

## 🖥️ Backend Services

### Flask ML API (Port 8000)
**File**: `ml/api.py`

**Endpoints**:
- `GET /`: Health check endpoint
- `POST /predict`: Main prediction endpoint

**Request Format**:
```json
{
  "text": "This movie was absolutely amazing!"
}
```

**Response Format**:
```json
{
  "label": 1,
  "probability": 0.85
}
```

**Dependencies**:
- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing
- joblib: Model serialization
- scikit-learn: Machine learning library

### Node.js Server (Port 5000)
**File**: `server/index.js`

**Purpose**: Acts as a middleware between frontend and ML API

**Endpoints**:
- `POST /api/predict`: Proxies requests to Flask ML API

**Dependencies**:
- Express: Web framework
- CORS: Cross-origin resource sharing
- Axios: HTTP client for ML API communication

## 🎨 Frontend Application

### React Client
**File**: `client/src/App.jsx`

**Features**:
- Text input area for movie reviews
- Real-time sentiment prediction
- Loading states and error handling
- Clean, responsive UI

**Key Components**:
- Text input with validation
- Submit button with loading state
- Results display showing sentiment and confidence
- Error message handling

**Dependencies**:
- React 19.1.1: Frontend framework
- Vite: Build tool and development server

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm or yarn

### Installation & Setup

#### 1. Machine Learning API
```bash
cd ml
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install flask flask-cors scikit-learn joblib pandas nltk wordcloud matplotlib
python api.py
```

#### 2. Node.js Backend Server
```bash
cd server
npm install
node index.js
```

#### 3. React Frontend
```bash
cd client
npm install
npm run dev
```

### Running the Application

1. **Start ML API**: `python ml/api.py` (runs on http://localhost:8000)
2. **Start Backend Server**: `node server/index.js` (runs on http://localhost:5000)
3. **Start Frontend**: `npm run dev` in client directory (runs on http://localhost:5173)

## 🔧 API Usage

### Direct ML API Usage
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "This movie was fantastic!"}'
```

### Through Node.js Server
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "This movie was fantastic!"}'
```

## 📊 Model Performance

The logistic regression model was trained on the IMDB dataset and provides:
- Binary sentiment classification (Positive/Negative)
- Confidence scores for predictions
- Real-time text processing capabilities

## 🛠️ Technology Stack

### Machine Learning
- **Python**: Core programming language
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation
- **NLTK**: Natural language processing
- **Flask**: Web API framework

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Axios**: HTTP client

### Frontend
- **React**: UI framework
- **Vite**: Build tool
- **JavaScript (ES6+)**: Programming language

## 🔍 Key Features

- **Real-time Prediction**: Instant sentiment analysis
- **Confidence Scoring**: Shows prediction reliability
- **Error Handling**: Graceful error management across all layers
- **CORS Support**: Cross-origin requests enabled
- **Responsive Design**: Works on desktop and mobile
- **Modular Architecture**: Separate concerns for ML, backend, and frontend

## 📝 Notes

- The model is trained on movie reviews and works best with similar text
- TF-IDF vectorization limits vocabulary to 2,500 most important words
- All services must be running for the application to work properly
- The Flask API loads the model and vectorizer on startup for optimal performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all components
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

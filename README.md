# 🩺 Diabetes Prediction Web App

An end-to-end machine learning web application that predicts diabetes risk based on patient health data. Built with *Flask, **Scikit-learn, **HTML/CSS, and **JavaScript*, the app provides real-time predictions and a dynamic UI with a loading spinner.

---

## ✨ Features

- 🧠 Machine learning model trained on Pima Indians Diabetes dataset  
- ⚙ Preprocessing pipeline with StandardScaler  
- 🌐 Flask backend serving a simple HTML/CSS/JS frontend  
- 🎡 Interactive UI with loading spinner and reset button  
- 📊 Real-time prediction without page reload using fetch()  

---

## 🚀 Quick Start

```bash
git clone https://github.com/Emmanoel24/diabetes-prediction-webapp.git
cd diabetes-prediction-webapp
python -m venv venv
source venv/bin/activate       # (Mac/Linux)
venv\Scripts\activate          # (Windows)
pip install -r requirements.txt
python train_model.py
python app.py
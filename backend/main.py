from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello World! budabuda"

@app.route("/pets")
def pets():
    return "I love pets"

if __name__ == "__main__":
    app.run(debug=True)
    

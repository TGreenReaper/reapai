import flask
from flask import Flask , render_template

app = Flask(__name__, static_folder="" , template_folder="")

@app.route("/")
@app.route("/movies")

def main():
    return render_template("index.html")



app.run(host="0.0.0.0" , port=8080)
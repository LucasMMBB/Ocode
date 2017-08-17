import json

from flask import request
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def hello():
    return "hello world!"

@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    data = json.loads(request.data)

    if "lang" not in data or "lang" not in data:
        return "you should provide both 'code' and 'lang'"
    code = data['code']
    lang = data['lang']

    print "API got called with code: %s in %s" % (code, lang)
    return jsonify({"hello": "world!"})
    
if __name__ == "__main__":
    app.run(debug=True)

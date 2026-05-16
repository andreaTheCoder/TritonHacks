from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    print(request.args.get("name"))
    return render_template("main.html")


@app.route("/schedule")
def schedule():
    return render_template("schedule.html")

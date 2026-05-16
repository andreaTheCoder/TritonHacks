from flask import Flask, render_template, request
import csv

app = Flask(__name__)

file = open("static/classes.csv", mode = "r")

classes = csv.reader(file)

@app.route("/")
def index():
    print(request.args.get("name"))
    return render_template("main.html")


@app.route("/schedule")
def schedule():
    return render_template("schedule.html", classes = classes)

from flask import Flask, render_template, request
import csv

app = Flask(__name__)

file = open("static/classes.csv", mode = "r")

classes = list(csv.reader(file))

file = open("static/advice.csv", mode = "r")

advice_csv = list(csv.reader(file))


@app.route("/")
def index():
    print(request.args.get("name"))
    return render_template("main.html")


@app.route("/schedule")
def schedule():
    if request.args.get("slot1") != None:
        print()
    
    return render_template("schedule.html", classes = classes, slot1 = request.args.get("slot1"), slot5 = request.args.get("slot5"), slot2 = request.args.get("slot2"), slot6 = request.args.get("slot6"), slot3 = request.args.get("slot3"), slot7 = request.args.get("slot7"), slot4 = request.args.get("slot4"), slot8 = request.args.get("slot8"))

@app.route("/links")
def links():
    return render_template("links.html")


@app.route("/advice")
def advice():
    return render_template("advice.html", advice_csv = advice_csv)

@app.route("/submitadvice", methods = ["GET", "POST"])
def submit():
    if request.method == "GET":
        return render_template("submitadvice.html")
    elif request.method == "POST":  
        return render_template("submitted.html")

@app.route("/submitted")
def submitted():

    return render_template("submitted.html", confirmation=request.args.get("advice"))
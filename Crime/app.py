from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
import numpy as np
import os
from modelHelper import ModelHelper

# COMMENTS TO TEST

#init app and class
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelHelper = ModelHelper()

#endpoint
# Favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

# Route to render index.html template
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/ml")
def model_page():
    # Return template and data
    return render_template("ml.html")

@app.route("/dashboard")
def dashboard():
    # Return template and data
    return render_template("dashboard.html")

@app.route("/dashboardmap")
def map():
    # Return template and data
    return render_template("map.html")

@app.route("/data")
def data():
    # Return template and data
    return render_template("data.html")

@app.route("/exploration")
def exploration():
    # Return template and data
    return render_template("exploration.html")

@app.route("/resources")
def resources():
    # Return template and data
    return render_template("resources.html")

@app.route("/about")
def about_us():
    # Return template and data
    return render_template("about.html")

@app.route("/makePredictions", methods=["POST"])
def makePredictions():
    content = request.json["data"]

    # parse
    watch = int(content["watch"])
    hour = int(content["hour"])
    division = content["division"]
    district = content["district"]
    day1 = content["day1"]
    nibrs_crime_category = content["nibrs_crime_category"]

    #dummy data
    # watch = 2
    # hour = 24
    # latitude = 32.734110
    # division = 'SouthCentral'
    # district = 'D9'
    # day1 = 'Mon'
    # nibrs_crime_category = 'PUBLIC INTOXICATION'

    prediction = modelHelper.makePredictions(watch, hour, division, district, day1, nibrs_crime_category)
    print(prediction)
    return(jsonify({"ok": True, "prediction": prediction}))

####################################
# ADD MORE ENDPOINTS

###########################################

#############################################################

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)

import pandas as pd
import datetime
import time
import pickle
import numpy as np


class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, watch, hour, division, district, day1, nibrs_crime_category):
    
        if division == "Central":
            latitude = 32.795254,
        elif division == "NorthCentral":
            latitude = 32.951221,
        elif division == "NorthEast":
            latitude = 32.866526,
        elif division == "NorthWest":
            latitude = 32.851355,
        elif division == "SouthCentral":
            latitude = 32.688674,
        elif division == "SouthEast":
            latitude = 32.745195,
        else:
            latitude = 32.730503

        template = pd.read_csv("Resources/template.csv")

        template["watch"] = watch
        template["hour"] = hour
        template["latitude"] = latitude

        district_columns = [x for x in template.columns if "district" in x]
        template[district_columns] = 0
        template[f"district_{district}"] = 1

        division_columns = [x for x in template.columns if "division" in x]
        template[division_columns] = 0
        template[f"division_{division}"] = 1

        day1_columns = [x for x in template.columns if "day1" in x]
        template[day1_columns] = 0
        template[f"day1_{day1}"] = 1

        nibrs_crime_category_columns = [x for x in template.columns if "nibrs_crime_category" in x]
        template[nibrs_crime_category_columns] = 0
        template[f"nibrs_crime_category_{nibrs_crime_category}"] = 1

        input_pred = template


        filename = 'Notebooks/finalized_crime_model1.sav'
        xgb_load = pickle.load(open(filename, 'rb'))

        X = np.array(input_pred)
        preds = xgb_load.predict_proba(X)
        # preds_singular = xgb_load.predict(X)

        filename = 'Notebooks/finalized_crime_model2.sav'
        xgb2_load = pickle.load(open(filename, 'rb'))

        X2 = np.array(input_pred)
        preds2 = xgb2_load.predict_proba(X2)
        # preds_singular2 = xgb2_load.predict(X2)

        preds2_real = preds[0][0]*preds2[0]

        preds2_real = np.append(preds2_real, [preds[0][1]])

        returnval = np.argmax(preds2_real)

        if preds[0][1] < 0.5: 
            returnval = np.argmax(preds2[0])
            
        return {"point": str(returnval), "proba": preds2_real.tolist()}
       
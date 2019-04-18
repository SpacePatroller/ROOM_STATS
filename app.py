import os
from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename

import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import func, create_engine, inspect, distinct, text
from sqlalchemy.pool import StaticPool

import queue
import threading

engine = create_engine(
    'sqlite://///Users/emanshupatel/code/Room_Statistics/room_stats_db.db',  connect_args={'check_same_thread': False},
    poolclass=StaticPool, echo=True)

# engine = create_engine('sqlite:////Users/epatel/workcode/Room_Statistics/room_stats_db.db',  connect_args={'check_same_thread': False},
#     poolclass=StaticPool, echo=True)


conn = engine.connect()


# reflect exsisting tables
Base = automap_base()
Base.prepare(engine, reflect=True)

data = Base.classes.room_stats


session = Session(engine)

inspector = inspect(engine)

# Get table information
print(inspector.get_table_names())


app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/data')
def main_data():

    stats = session.query(data.Room, data.ADR,
                          data.ROOM_REV, data.RM_NIGHTS).all()

    return jsonify(stats)


@app.route('/data_room/<floor>')
def data_room(floor):

    stats = session.query(data.Room, data.ADR, data.ROOM_REV,
                          data.RM_NIGHTS).filter(data.FLOOR == floor).all()

    return jsonify(stats)


@app.route('/data_room/nights/<nights>')
def data_room_nights(nights):

    stats = session.query(data.Room, data.ADR, data.ROOM_REV,
                          data.RM_NIGHTS).filter(data.RM_NIGHTS > nights).all()

    return jsonify(stats)


if __name__ == "__main__":
    app.run(debug=True)

#!/usr/bin/env python3
from flask import Flask, render_template, request, redirect, url_for, Response
import redis, json
import flask_cors

# config system
app = Flask(__name__)
app.config.update(dict(SECRET_KEY='yoursecretkey'))
r = redis.StrictRedis(host='localhost', port=6379, db=0, password='13111999')
cors = flask_cors.CORS(app, resource={r"/": {"origin": "*"}})

@app.route('/RealData', methods=['GET'])
def real():
    # get real time data
    redis_data = r.execute_command('JSON.GET', 'dht11.real')
    result = json.loads(redis_data.decode())
    response = {
        'error_code': 0,
        'result': result
    }
    return response

@app.route('/GraphData', methods=['GET'])
def graph():
    # get full graph data
    redis_data = r.execute_command('JSON.GET', 'dht11.graph')
    result = json.loads(redis_data)
    response = {
        'error_code': 0,
        'result': result
    }
    return response

if __name__=='__main__':
    app.run('0.0.0.0', port=3001, debug=True)
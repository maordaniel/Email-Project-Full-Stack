Flask
=====



Installing
----------

Install and update using `pip`:


    pip install -U Flask


A Simple Example
----------------


    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def hello():
        return "Hello, World!"


    $ env FLASK_APP=hello.py flask run
     * Serving Flask app "hello"
     * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
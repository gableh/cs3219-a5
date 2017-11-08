from flask import Flask, redirect, url_for, request, render_template

app = Flask(__name__)


@app.route('/')
def msgraph():
    return render_template('msgraph.html')



if __name__ == '__main__':
    app.run()
